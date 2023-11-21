import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
// import { Button } from "./ui/button";

const MiniNav = ({ links }) => {
  return (
    <div className="mb-3 flex items-center">
      {links.map((lnk, index) => {
        const currentLink = links.length - 1 === index;
        if(currentLink) return <><ArrowRight/><span className="mx-4 text-yellow-500 font-bold text-2xl capitalize">{lnk.text}</span></>
        return (
          <>
            {index !== 0 && <ArrowRight/>}
            <Link
              href={lnk.link}
              key={index}
              className='  mx-4 hover:underline font-bold text-2xl capitalize'
            >
              {/* <Button variant='link' className='capitalize font-semibold text-base'> */}
              {lnk.text}
              {/* </Button> */}
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default MiniNav;
