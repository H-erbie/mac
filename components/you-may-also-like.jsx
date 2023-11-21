"use client";

import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import {  lowerCase } from "@/lib/utils";

const YouMayAlsoLike = ({products, category, productId}) => {

  const newProducts = lowerCase(products)
  
  let filterdProducts = newProducts.filter(product => product.categories.includes(category) && product._id !== productId)

  return (
    <div className="container h-48 border rounded-lg my-3 py-2 px-0">
      <Swiper
        navigation
        slidesPerView={3}
        
        breakpoints={
          {
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }
        }
        spaceBetween={1}
        modules={[Navigation]}
        className="h-full w-full rounded-lg"
      >
        {filterdProducts.splice(0,12).map((product) => (
          <Suspense fallback={    <div className='h-24 w-24 bg-gray-400 animate-pulse rounded-lg'></div>
        } key={product._id}>
              <SwiperSlide
                className="flex justify-center items-center hover:opacity-50"
                style={{ width: "120px", height: '150px' }}
              >
                            <Link  href={`/products/${product.slug.current}`}>

                <div
                  className={`flex relative gap-2 flex-col  w-full items-center justify-center`}
                >
                  <Image
                  src={urlForImage(product.images[0]).url()}
                  alt={product.name}
                  width={96}
                  height={96}
                    className={`block bg-white rounded-lg h-24 w-24 sm:h-28 sm:w-28 object-cover `}
                  />
                  
                  <p className="text-sm text-center  sm:text-base">{product.name}</p>
                </div>
                </Link>
              </SwiperSlide>
          </Suspense>
        ))}
      </Swiper>
    </div>
  );
};

export default YouMayAlsoLike;
