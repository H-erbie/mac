"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import MiniNav from "@/components/mini-nav";
import { Loader2 } from "lucide-react";
import { NextResponse } from "next/server";

const page = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setUserInfo({...userInfo, email: '', password: ''})
        setIsLoading(false)

    if (res?.error) return setError(res.error);
    router.replace("/");
  };
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "sign-in", link: "/auth/sign-in" },
  ];
  // const signG = () => {
  //   try {
  //     signIn('google')
  //   } catch (error) {
  //     return NextResponse.json(
  //       {error}
  //     );
  //   }
  // }
  return (
    <div className="main items-center justify-center gap-7 p-0 ">
      <MiniNav links={miniLinks} />
      <h2 className="text-xl capitalize font-bold">sign in</h2>
      {/* <h2 className="text-xl capitalize font-bold" onClick={signG}>sign in with google</h2> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
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

        <Button  type="submit" className="text-lg bg-yellow-500 hover:bg-yellow-600" disabled={isLoading}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin'/> }
          sign in
        </Button>
        <p className="text-lg">
          Don't have an account?{" "}
          <Link href="/auth/sign-up">
            {" "}
            <Button variant="link" className="text-yellow-500  text-lg">
              sign up{" "}
            </Button>{" "}
          </Link>
        </p>
      </form>
      <p className="text-red-600 text-lg">{error}</p>
    </div>
  );
};

export default page;


