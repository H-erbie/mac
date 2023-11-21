"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import MiniNav from "@/components/mini-nav";

const Page = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: ""
  });
  const { fname, lname, email, password, phone } = userInfo;
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
       await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    router.replace("/");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const miniLinks = [
    { text: "home", link: "/" },
    { text: "sign-up", link: "/auth/sign-up" },
  ];
  return (
    <div className="main items-center justify-center gap-7 p-0">
      <MiniNav links={miniLinks} />

      <h2 className="text-xl capitalize font-bold">sign up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <div className="space-y-1">
        <Label htmlFor="fname" className="text-base font-medium">
          First Name
        </Label>
        <Input
          id="fname"
          name="fname"
          type="text"
          autoComplete="off"
          placeholder="Kojo"
          value={fname}
          onChange={handleChange}
          className="h-9 lg:w-[300px] focus:outline-pink-200 dark:focus:outline-pink-300"
          //   defaultValue={defaultSearchQuery}
        />
        </div>
        <div className="space-y-1"><Label htmlFor="lname" className="text-base font-medium">
          Last Name
        </Label>

        <Input
          id="lname"
          name="lname"
          type="text"
          autoComplete="off"
          placeholder="Anokye"
          value={lname}
          onChange={handleChange}
          className="h-9 lg:w-[300px] focus:outline-pink-200 dark:focus:outline-pink-300"
          //   defaultValue={defaultSearchQuery}
        /></div>
        <div className="space-y-1">
          
        <Label htmlFor="email" className="text-base font-medium">
          Email
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          placeholder="email@example.com"
          value={email}
          onChange={handleChange}
          className="h-9 lg:w-[300px] focus:outline-pink-200 dark:focus:outline-pink-300"
          //   defaultValue={defaultSearchQuery}
        />
        
        </div>
        <div className="space-y-1">
          
        <Label htmlFor="email" className="text-base font-medium">
          Phone
        </Label>

        <Input
          id="phone"
          name="phone"
          type="text"
          autoComplete="off"
          placeholder="+233123456789"
          value={phone}
          onChange={handleChange}
          className="h-9 lg:w-[300px] focus:outline-pink-200 dark:focus:outline-pink-300"
          //   defaultValue={defaultSearchQuery}
        />
        
        </div>
        <div className="space-y-1">
        <Label htmlFor="password" className="text-base font-medium">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          placeholder="password123"
          value={password}
          onChange={handleChange}
          className="h-9 lg:w-[300px] focus:outline-pink-200 dark:focus:outline-pink-300"
          //   defaultValue={defaultSearchQuery}
        />
        </div>

        <Button type="submit" className="text-lg bg-yellow-500 hover:bg-yellow-600">
          sign up
        </Button>
        <p className="text-lg">
          Don't have an account?{" "}
          <Link href="/auth/sign-in">
            {" "}
            <Button variant="link" className="text-yellow-500 text-lg">
              sign in{" "}
            </Button>{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
