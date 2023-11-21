"use client";
import React, { useState } from "react";
import MainNav from "./main-nav";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlignLeft,
  User2,
  ShoppingBag,
  Search,
  X,
  Truck,
  LogOut,
  ChevronDown,
  LogIn, 
  UserPlus2
} from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

import { Input } from "./ui/input";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./themeToggle";
import { siteConfig } from "@/config/site";
import Socials from "./socials";

const SiteHeader = ({categories}) => {
  // signOut()

  const { cartCount } = useShoppingCart();

  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const fullname = data?.user?.name;
  const username = fullname && fullname.split(" ");
  const userFirstname = username && username[0];
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [dropSearch, setDropSearch] = useState(false);
  const defaultSearchQuery = searchParams.get("search") ?? "";
  const submitHandler = (event) => {
    event.preventDefault();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search");
    router.replace(`/?search=${searchQuery}`);
  };
  if (pathname.startsWith("/auth")) return null;

  const handleChange = async (event) => {
    setSearchValue(event.target.value)
  };
  const hideSearch = () => {
    setSearchValue('')
    setDropSearch(false)
  }

  
  return (
    <NavigationMenu className="nav-menu px-5 pl-2 sm:px-8 py-4 fixed bg-background top-0 left-0 border-b">
      <NavigationMenuList>
        <Sheet>
          <SheetTrigger asChild>
            <NavigationMenuItem className="hover:bg-gray-100 dark:hover:bg-[#3f434a] rounded-md p-3 cursor-pointer">
              <AlignLeft className="text-yellow-600  " />
            </NavigationMenuItem>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="px-0 py-1 justify-between h-full duration-0 min-h-[100vh] overflow-y-scroll"
          >
            <SheetHeader className="flex-col flex p-2 border-b ">
              <SheetTitle className="flex focus:outline-none justify-evenly items-center">
                {" "}
                <SheetClose className="focus:outline-none">
                  {isAuth ? (
                    <Link href='/profile' className="flex gap-3 capitalize">
                      <User2 className="text-yellow-600" />
                      {fullname}
                    </Link>
                  ) : (
                    <Link
                      href="/auth/sign-in"
                      className="flex gap-3 capitalize"
                    >
                      <User2 className="text-yellow-600" /> sign in
                    </Link>
                  )}
                </SheetClose>
                <div className="mr-11">
                  {" "}
                  <ThemeToggle />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="pl-8 py-3">
               <h3 className="text-lg font-semibold">categories</h3>
               <div className="flex flex-col gap-y-2">
               {categories.map((category, index) => (
                <SheetClose key={index} className='focus:outline-none w-full text-start'>
                  <Link  href={`/categories/${category}`} className=' hover:underline'>
                    {category}
                  </Link></SheetClose>
                ))}
               </div>
               {/* <Link href='/categories' className='text-yellow-500 hover:underline'>more categories...</Link> */}
              <SheetFooter className="flex mt-3 pt-3 border-t flex-col sm:flex-col sm:justify-start gap-3 sm:space-x-0">
                <div className=" flex flex-col gap-2 ">
                  {siteConfig.footer.map((link) => (
                    <SheetClose
                      key={link.name}
                      className="text-base focus:outline-none hover:underline w-full text-start"
                    >
                      <Link href={link.href} >{link.name}</Link>
                    </SheetClose>
                  ))}
                </div>
                <SheetClose>
                  <Socials/>
                </SheetClose>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <NavigationMenuItem>
          <MainNav />
        </NavigationMenuItem>

        <div className="flex gap-2 sm:gap-5 items-center">
          <NavigationMenuItem>
            <form
              onSubmit={submitHandler}
              className=" items-center lg:inline-flex gap-2 mr-2"
            >
              <Input
                id="search"
                name="search"
                type="search"
                autoComplete="off"
                defaultValue={defaultSearchQuery}
                placeholder="Search products..."
                value={searchValue}
                onChange={handleChange}
                className="h-9 lg:max-w-[300px] w-3/4 border border-black dark:border-yellow-600 focus:outline-none hidden lg:block"
                //   defaultValue={defaultSearchQuery}
              />
              
              <Button className="bg-transparent text-yellow-600 cursor-pointer dark:hover:bg-[#3f434a] hover:bg-gray-10 hidden lg:block px-3 py-2">
                <Search />
              </Button>
              <Button
                type="button"
                className={
                  dropSearch ? "px-3 py-2 bg-transparent text-yellow-600 hover:bg-gray-100  cursor-pointer dark:hover:bg-[#3f434a] hover:bg-gray-10 block lg:hidden invisible" : "px-3 py-2 hover:bg-gray-100 bg-transparent text-yellow-600  cursor-pointer dark:hover:bg-[#3f434a]  block lg:hidden"
                }
                onClick={() => setDropSearch(true)}
              >
                <Search />
              </Button>
            </form>
            <form               onSubmit={submitHandler}
 className={dropSearch ? "search-drop" : "search-drop hidden"}>
              <Input
                id="search"
                name="search"
                type="search"
                autoComplete="off"
                defaultValue={defaultSearchQuery}
                value={searchValue}
                onChange={handleChange}
                placeholder="Search products..."
                className="h-9  w-full border border-black dark:border-yellow-600 focus:outline-none lg:hidden"
                //   defaultValue={defaultSearchQuery}
              />
              <Button
                className="px-3 py-2 bg-transparent hover:bg-gray-100  text-yellow-600  cursor-pointer dark:hover:bg-[#3f434a] block lg:hidden"
              >
                <Search />
              </Button>
              <Button
                type="button"
                className="px-3 py-2 bg-transparent hover:bg-gray-100 text-yellow-600 cursor-pointer dark:hover:bg-[#3f434a] block lg:hidden"
                onClick={hideSearch}
              >
                <X />
              </Button>
            </form>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden lg:block">
            <NavigationMenuTrigger className="dark:hover:bg-[#3f434a] font-medium text-base capitalize">
              categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-background w-3/4">
              <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] place-items-start">
                {categories.map((category, index) => (
                  <Link key={index} href={`/categories/${category}`} className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    {category}
                  </Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {isAuth ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none dark:hover:bg-[#3f434a] hover:bg-gray-100 px-3 py-2 rounded-md ">
                  <div className="flex gap-1 sm:gap-3 ">
                    <User2 className="text-yellow-600 hidden sm:flex" />
                    <span className="font-medium  capitalize text-base flex gap-1">
                      {userFirstname}
                      <ChevronDown className="text-yellow-600 h-4 w-4 mt-1" />
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background">
                  <DropdownMenuGroup>
                    {/* <Link href="/order">
                      <DropdownMenuItem>
                        <Truck className="mr-2 h-4 w-4 text-yellow-600" />
                        <span>Track Order</span>
                      </DropdownMenuItem>
                    </Link> */}
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <User2 className="mr-2 h-4 w-4 text-yellow-600" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4 text-yellow-600" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex gap-3 dark:hover:bg-[#3f434a] hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                {" "}
                <User2 className="text-yellow-600" />
                <span className=" gap-1 font-medium text-base capitalize flex">
                  <span className="sm:block hidden">user</span>
                                        <ChevronDown className="text-yellow-600 h-4 w-4 mt-1" />

                </span>
              </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-background'>
                <DropdownMenuGroup>
                  <Link href='/auth/sign-in'>
                  <DropdownMenuItem>
                    <LogIn className="mr-2 h-4 w-4 text-yellow-600" />
                    <span>Sign in</span>
                  </DropdownMenuItem></Link>
                  <Link href='/auth/sign-up'>

                  <DropdownMenuItem>
                    <UserPlus2 className="mr-2 h-4 w-4 text-yellow-600" />
                    <span>Sign up</span>
                  </DropdownMenuItem></Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
              </DropdownMenu>
            )}
          </NavigationMenuItem>
          <Link href="/cart">
            <NavigationMenuItem className="flex gap-1 relative items-center dark:hover:bg-[#3f434a] hover:bg-gray-100 px-3 py-2 rounded-md ">
              <div className="flex">
                <ShoppingBag className="text-yellow-600" />
              </div>
              <span className="font-medium text-base capitalize hidden sm:block">
                cart
              </span>
              <span className="absolute right-2 -top-[6px]">{cartCount}</span>
            </NavigationMenuItem>
          </Link>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SiteHeader;
