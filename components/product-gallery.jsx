"use client"

import { useState } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import Img from "./ui/image"



 export default function ProductGallery({product}) {
  const [size, setSize] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  return (
    <div className="flex lg:sticky w-full lg:top-24 flex-col-reverse items-center">
      {/* Image Grid */}
      <div className="mx-auto mt-6 hidden w-3/4 max-w-full sm:block lg:max-w-none">
        <ul className="grid grid-cols-4 gap-6 mx-auto w-2/3">
          {product.images.map((image, index) => {
            
            return(
            <div
              key={image._key}
              onClick={() => setSelectedImage(index)}
              className="relative  flex h-16 cursor-pointer items-center justify-center rounded-md bg-gray-100 text-sm font-medium uppercase hover:bg-gray-50"
            >
              <span className="absolute w-full  inset-0 overflow-hidden rounded-md">
                <Img
                  src={urlForImage(image).url()}
                  width={200}
                  height={200}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                //   placeholder="blur"
                //   blurDataURL={`data:image/svg+xml.base64,${toBase64(shimmer(200, 200))}`}
      
                />
              </span>
             { !index == selectedImage && <span
                  className="pointer-events-none h-16 w-full absolute top-0 left-0 backdrop-brightness-[0.2] hover:backdrop-brightness-50"
                  
                />}
            </div>
 )})}
        </ul>
      </div>

      {/* Main Image */}
      <div className="aspect-h-1 rounded-md aspect-w-1 bg-gray-300 h-[470px] w-72 min-w-[280px]   overflow-hidden">
        <Img
          priority
          src={urlForImage(product.images[selectedImage]).url()}
          alt={`Main ${product.name} image`}
          width={350}
          height={150}
          className="h-full hover:scale-125  transition-all w-full border-2 bg-gray-300 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
        //   placeholder="blur"
        //   blurDataURL={`data:image/svg+xml.base64,${toBase64(shimmer(600, 750))}`}

        />
      </div>
    </div>
  )
}
