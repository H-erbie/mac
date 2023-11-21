'use client'
import React from "react";
import Link from "next/link"
// import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const MainNav = ({siteInfos}) => {
  return (
    <div className="flex gap-6 md:gap-10">
      {/* {siteInfos.map(siteInf => ( */}
      <Link href="/" className="flex items-center justify-center space-x-2">
        {/*LOGO*/}
        {/* <Image src={urlForImage(siteInfo.images).url()} width={180} height={180} alt="LOGO" className="text-pink-400"/> */}
        <span className="font-bold w-[6rem] sm:w-max text-base sm:text-lg md:text:xl lg:text-2xl ">{siteConfig.name}</span>
      </Link>
    {/* //   ))} */}
    </div>
  );
};

export default MainNav;
