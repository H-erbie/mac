"use client";

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation";

export default  function  SiteFooter({siteInfos}) {
  const pathname = usePathname()

  if(pathname.startsWith('/auth')) return null

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-14 lg:px-8">

        <nav
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
          aria-label="Footer"
        >
          {siteConfig.footer.map((item) => (
            <div key={item.name} className="">
              <Link href={item.href} className="text-sm leading-6">
                <Button variant='link'>
                {item.name}
                </Button>
              </Link>
            </div>
          ))}
        </nav>
        <Link
          href="/"
          className="mt-5 block text-center text-base leading-5"
        >
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </Link>
        <p className="text-center">Developed by <Link
          href="https://herbiess.netlify.app"
        >
                          <span  className="text-base hover:underline text-start text-yellow-500 "
>

          HerbieDevs</span>
        </Link> </p>
        
      </div>
    </footer>
  )
}
