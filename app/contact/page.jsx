import React from 'react'
import { Phone } from 'lucide-react'
import MiniNav from '@/components/mini-nav';
const page = () => {
    const miniLinks = [
        { text: "home", link: "/" },
        { text: "contact-us", link: "" },
      ];
      
  return (
    <div className='main pt-24 flex justify-center items-center'>
              <MiniNav links={miniLinks} />
 <h1 className="text-3xl animate-pulse font-bold tracking-tight sm:text-4xl">
        Contact us
        <Phone className='w-52 h-52'/>
      </h1>
    </div>
  )
}

export default page