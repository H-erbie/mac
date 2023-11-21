import mongoose from 'mongoose'

const url = process.env.CONNECTION_STRING
let connection;
export const startDb = async () => {
    if(!connection) connection = await mongoose.connect(url)
    return connection
}