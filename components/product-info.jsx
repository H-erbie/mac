"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ProductInfo({ product }) {
  const { addItem, incrementItem, cartDetails } = useShoppingCart();
  const { toast } = useToast();
  const isInCart = Boolean(cartDetails && cartDetails[product._id]);
  
  const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`
  
  function addToCart(e) {
    const selectedLocation = e.target[0].innerText
    e.preventDefault()
    const item = {
      ...product,
      id: product._id,
      loc: selectedLocation
    };

    isInCart ? incrementItem(item._id) : addItem(item);
    toast({
      title: `${item.name} added!`,
      description: "Product added to cart",
      action: <Link href="/cart">Open Cart</Link>,
    });
    console.log(item)
  }
  const rates = [1, 2, 3, 4, 5];


  return (
    <div className="px-4 mt-10 lg:mt-0 sm:px-0 w-full sm:mx-auto">
      <h1 className="text-3xl font-bold sm:w-3/4 w-[90%] mx-auto lg:text-start text-center lg:mx-0 tracking-tight">{product.name}</h1>

      <div className="mt-3 w-3/4 mx-auto lg:text-start text-center lg:mx-0">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">GHS {product.price}</p>
      </div>

      {/* ratings */}
      <div className="flex gap-2 mt-4 w-3/4 mx-auto lg:justify-start justify-center lg:mx-0">
        {rates.map((rate, index) => {
          let icon = "";
          if (rate == rates.length) icon = <IoIosStarHalf />;
          else icon = <IoIosStar />;
          return <span className="text-yellow-600 text-2xl" key={index}>{icon}</span>;
        })}
      </div>

      <div className="mt-6 sm:w-3/4 w-[90%] mx-auto lg:text-start text-center lg:mx-0">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base ">{product.description}</div>
      </div>

      {/* <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(product.sizes[0])}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button onClick={()=> setSelectedSize(size)} key={size} variant={selectedSize === size ? "default" : "outline"} className="mr-2 mt-4">
            {getSizeName(size)}
          </Button>
        ))}
      </div> */}

      <h3 className="text-lg font-semibold mt-6 capitalize w-3/4 mx-auto lg:text-start text-center lg:mx-0">
        share this product
      </h3>

      <div className="mt-3 flex gap-3 w-3/4 lg:justify-start justify-center lg:mx-0 mx-auto" >
        <span className="text-lg hover:text-yelow-500">
          <Facebook />
        </span>
        <span className="text-lg hover:text-yelow-500">
          <Instagram />
        </span>
        <span className="text-lg hover:text-yelow-500">
          <Twitter />
        </span>
      </div>
      <form className="mt-8 sm:w-3/4 w-[90%] lg:mx-0 mx-auto" onSubmit={addToCart}>
        <h3 className="text-lg mx-auto lg:mx-0 w-[90%] sm:w-2/3 mb-4 font-semibold">
          Where should we ship?
        </h3>
        <Select required  >
          <SelectTrigger disabled={isInCart ? true : false  } className="sm:w-2/3 w-[90%] mx-auto lg:mx-0" >
            <SelectValue placeholder="choose a location" />
          </SelectTrigger>
          <SelectContent className="focus:outline-none bg-background boder-black dark:border-yellow-600">
            <SelectGroup>
              <SelectItem value="ashanti" >Ashanti</SelectItem>
              <SelectItem value="greater accra">Greater Accra</SelectItem>
              <SelectItem value="brong">Brong</SelectItem>
              <SelectItem value="central">Central</SelectItem>
              <SelectItem value="ahafo">Ahafo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="mt-4 flex">
          <Button
            
            type="submit"
            className="w-2/3 lg:mx-0 mx-auto bg-yellow-600 py-6 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Add to cart
          </Button>
        </div>
      </form>

      
      <div className="mt-5 lg:mx-0 mx-auto w-[90%] sm:w-3/4">
        <h3 className="text-lg font-semibold lg:text-start text-center">
          Feedback from verified purchases
        </h3>
        <div className="lg:mx-0 mx-auto w-[90%] sm:w-3/4">
          <div className="py-4">
            <h3 className="text-lg mx-auto  text-center lg:text-start w-3/4 font-medium">50 verified Ratings</h3>
            <p className="text-2xl  mx-auto lg:mx-0 lg:text-start  text-center font-semibold">4.5/5</p>
            <div className="flex gap-2 my-4 justify-center lg:justify-start">
              {rates.map((rate, index) => {
                let icon = "";
                if (rate == rates.length) icon = <IoIosStarHalf />;
                else icon = <IoIosStar />;
                return <span className="text-yellow-600 text-2xl" key={index}>{icon}</span>;
              })}
            </div>
            <div className="border-t flex gap-3 flex-col w-[90%] sm:w-3/4 pt-4">
              <div className="flex gap-2 items-center">
                <span>5</span>
                <span className="text-yellow-600">
                  <IoIosStar />
                </span>
                <span>(20)</span>
                <span className="w-full after:h-4 h-4 rounded-md after:rounded-md relative after:content-[''] after:absolute after:left-0 after:w-1/2 after:bg-yellow-500 bg-gray-300 "></span>
              </div>
              <div className="flex gap-2 items-center">
                <span>4</span>
                <span className="text-yellow-600">
                  <IoIosStar />
                </span>
                <span>(10)</span>
                <span className="w-full after:h-4 h-4 rounded-md after:rounded-md relative after:content-[''] after:absolute after:left-0 after:w-1/2 after:bg-yellow-500 bg-gray-300 "></span>
              </div>
              <div className="flex gap-2 items-center">
                <span>3</span>
                <span className="text-yellow-600">
                  <IoIosStar />
                </span>
                <span>(10)</span>
                <span className="w-full after:h-4 h-4 rounded-md after:rounded-md relative after:content-[''] after:absolute after:left-0 after:w-1/2 after:bg-yellow-500 bg-gray-300 "></span>
              </div>
              <div className="flex gap-2 items-center">
                <span>2</span>
                <span className="text-yellow-600">
                  <IoIosStar />
                </span>
                <span>(20)</span>
                <span className="w-full after:h-4 h-4 rounded-md after:rounded-md relative after:content-[''] after:absolute after:left-0 after:w-1/2 after:bg-yellow-500 bg-gray-300 "></span>
              </div>
              <div className="flex gap-2 items-center">
                <span>1</span>
                <span className="text-yellow-600">
                  <IoIosStar />
                </span>
                <span>(10)</span>
                <span className="w-full after:h-4 h-4 rounded-md after:rounded-md relative after:content-[''] after:absolute after:left-0 after:w-1/2 after:bg-yellow-500 bg-gray-300 "></span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg my-3 font-semibold">
              comments from verified purchases
            </h3>
            <div className="border-y py-3 w-full sm:w-3/4">
            <div className="flex gap-x-5 items-center justify-between w-full">
              <div className="flex gap-2 ">
                {rates.map((rate, index) => {
                  let icon = "";
                  if (rate == rates.length) icon = <IoIosStarHalf />;
                  else icon = <IoIosStar />;
                  return (
                    <span className="text-yellow-600 text-lg sm:text-2xl" key={index}>{icon}</span>
                  );
                })}
              </div>
              <span className="text-gray-500">{currentDate}</span>

              <span>Kojo</span>
            </div>
            <p className='my-3'>E dey be, chale. Thumbs up to the team!</p>
            </div>
            <div className="border-y py-3 w-full sm:w-3/4">
            <div className="flex gap-x-5 justify-between items-center w-full">
              <div className="flex gap-2 ">
                {rates.map((rate, index) => {
                  let icon = "";
                  if (rate == rates.length) icon = <IoIosStarHalf />;
                  else icon = <IoIosStar />;
                  return (
                    <span className="text-yellow-600 text-lg sm:text-2xl" key={index}>{icon}</span>
                  );
                })}
              </div>
              <span className="text-gray-500">{currentDate}</span>
              <span>Kojo</span>
            </div>
            <p className='my-3'>E dey be, chale. Thumbs up to the team!</p>
            </div>
            <div className="border-y py-3 w-full sm:w-3/4">
            <div className="flex gap-x-5 justify-between items-center w-full">
              <div className="flex gap-2">
                {rates.map((rate, index) => {
                  let icon = "";
                  if (rate == rates.length) icon = <IoIosStarHalf />;
                  else icon = <IoIosStar />;
                  return (
                    <span className="text-yellow-600 text-lg sm:text-2xl" key={index}>{icon}</span>
                  );
                })}
              </div>
              <span className="text-gray-500">{currentDate}</span>
              <span>Kojo</span>
            </div>
            <p className='my-3'>E dey be, chale. Thumbs up to the team!</p>
            </div>
            <div className="border-y py-3 w-full sm:w-3/4">
            <div className="flex gap-x-5 justify-between items-center w-full">
              <div className="flex gap-2 ">
                {rates.map((rate, index) => {
                  let icon = "";
                  if (rate == rates.length) icon = <IoIosStarHalf />;
                  else icon = <IoIosStar />;
                  return (
                    <span className="text-yellow-600 text-lg sm:text-2xl" key={index}>{icon}</span>
                  );
                })}
              </div>
              <span className="text-gray-500">{currentDate}</span>

              <span>Kojo</span>
            </div>
            <p className='my-3'>E dey be, chale. Thumbs up to the team!</p>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
