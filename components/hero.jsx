// import React from 'react'
// import Image from 'next/image'
// const Hero = () => {
//   return (
//     <div className='w-screen h-screen relative overflow-y-hidden' >
//         <div className="w-full h-full flex-col gap-12 flex items-center justify-center absolute left-0 right-0 backdrop-brightness-[0.7]">
//             <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Shop like a gee😎</p>
//             <p className='text-xl font-medium text-yellow-500'>sign in and be part of the trend!</p>
//             <button className='bg-white text-black px-3 py-2 font-semibold text-lg hover:bg-gray-300'>shop now</button>
//         </div>
//         <Image src={hero1} width={500} height={500} className='w-full'/>
//     </div>  
//   )
// }

// export default Hero

"use client";

import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Img from "./ui/image";

import { urlForImage } from "@/sanity/lib/image";

export default function Hero({ heroes }) {
  return (
    <>
      {/* <HeroImages/>  */}
      <div className="container mx-0 p-0">

        <Swiper
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="h-screen w-full"
        >
          {" "}
          
            {heroes.map((img) => (
              <SwiperSlide key={img._id}>
                <div
                  className={`flex relative  h-full w-full items-center justify-center`}
                >
                        <Suspense
            fallback={
              <div className="bg-gray-300 dark:bg-gray-400 animate-pulse h-screen w-full "></div>
            }
          >
            <div className="absolute top-0 left-0 w-full h-full backdrop-brightness-[.5]  dark:backdrop-brightness-[.6] flex justify-center items-center">
                  <p className="font-bold text-2xl sm:text-3xl w-3/4 md:text-4xl lg:text-5xl text-white mx-auto">{img.detail}</p>
                </div>
                  <Img src={urlForImage(img.images).url()} width={500} height={500} alt={img._id}/>   
                  </Suspense>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

      </div>
    </>
  );
}
