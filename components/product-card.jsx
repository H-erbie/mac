import React from "react";
import Img from "./ui/image";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";

const ProductCard = ({ product }) => {
  const rates = [1, 2, 3, 4, 5];

  return (
    <Link
      href={`/products/${product.slug.current} `}
      className="w-[153px] h-max lg:w-full lg:max-w-[225px] rounded-md hover:opacity-80"
    >
      <div className="overflow-hidden lg:w-full w-[153px] mx-auto h-[153px] lg:max-w-[225px] lg:max-h-[225px]  rounded-md">
        <Img
          src={urlForImage(product.images[0]).url()}
          width={225}
          height={225}
          alt={product.name}
          cls={"w-[153px] h-[153px] lg:w-full lg:max-w-[225px] lg:max-h-[225px] "}
        />
      </div>
      
        <p className="mt-2 text-center">
          {product.name}
          
        </p>
        <div className="flex lg:flex-row-reverse flex-col  items-center lg:mt-4 mt-1 justify-evenly">
          <p className="flex lg:flex-col items-center lg:gap-x-0 gap-x-3 gap-y-3">
          <span>GHS {product.price} </span>
          <span className="line-through dark:text-gray-300 text-gray-600  text-sm">GHS 43.99</span>
        </p>
        <div className="flex gap-1 mt-1 lg:mt-0 mx-auto lg:justify-start justify-center lg:mx-0">
            {rates.map((rate, index) => {
              let icon = "";
              if (rate == rates.length) icon = <IoIosStarHalf />;
              else icon = <IoIosStar />;
              return <span className="text-yellow-600 text-sm" key={index}>{icon}</span>;
            })}
          </div>
      </div>
    </Link>
  );
};

export default ProductCard;
