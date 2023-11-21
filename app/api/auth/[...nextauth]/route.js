import { startDb } from '@/lib/db'
import UserModel from '@/models/userModal'
import NextAuth from 'next-auth'
import {redirect} from 'next/navigation'

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'

class SignUpRequiredError extends Error {
    constructor() {
      super('New user sign-up required');
      this.redirectTo = '/auth/sign-up'; // Set the redirect URL here
    }
  }
  
export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
         CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req){
                const {email, password} = credentials
                await startDb()
                const user = await UserModel.findOne({email})
                if(!user) throw Error('email/password mismatch')
                const passwordMatch = await user.comparePassword(password )
                if(!passwordMatch) throw Error('email/password mismatch')
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: `${user.fname} ${user.lname}`,
                    phone: user.phone,
                    password: user.password,
                    role: user.role
                } 
            }
         }),
        //  GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
            
            
        //   }),


         
    ],
    callbacks: {
        // async signIn(profile) {
        //     await startDb();
        //     const user=  await UserModel.findOne({ email: profile.email });
    
        //     if (!user) {
        //       // User is not in the database, redirect to sign-up page
        //       console.log('not in db')
        //           }
        //           else{return true  }
            
        //    } ,
        
        jwt(params){
            if(params.user?.role){
                params.token.role = params.user.role,
                params.token.id = params.user.id,
                params.token.phone = params.user.phone 
                params.token.password = params.user.password 
            }
            return params.token
        },
        session({session, token}){

            if(session.user){
                session.user.id = token.id
                session.user.role = token.role
                session.user.phone = token.phone
                session.user.password = token.password

            }
            console.log(token, session)
            return session
        }

        

    }
}
const authHandler = NextAuth(authOptions)

export { authHandler as GET, authHandler as POST}