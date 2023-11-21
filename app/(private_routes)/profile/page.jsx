"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import MiniNav from "@/components/mini-nav";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {

  const router = useRouter();
  const [logoutIsLoading, setLogoutIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);

  const { data, status } = useSession();
  const name = data?.user?.name;
  const currentPswd = data?.user?.password;
  const currentPhone = data?.user?.phone;
  const currentEmail = data?.user?.email;
  const username = name && name?.split(" ");
  const avatar = name && name?.split("")
    const userId = data?.user?.id;

  const [userInfo, setUserInfo] = useState({
    fname: username && username[0],
    lname: username && username[1],
    email: currentEmail,
    currentPassword: "",
    password: currentPswd,
    phone: currentPhone,
    id: userId,
  });

  const { fname, lname, email, password, phone, currentPassword } = userInfo;
  const [showPassword, setShowPassword] = useState(false);
  const comparePassword = async () => {
    const compare = await bcrypt.compare(currentPassword, password);
    if (compare) {
      setUserInfo({ ...userInfo, password: "", currentPassword: "" });
      setShowPassword(true);
    } else {
      console.log("password incorrect. try again");
    }

    return compare;
  };

  const isAuth = status === "authenticated";
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "user profile", link: "" },
  ];

  // update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);
    try {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      setUserInfo((userInfo.password = newPassword));
      const res = await fetch("/api/auth/users", {
        method: "PATCH",
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      setShowPassword(false);
      setUpdateIsLoading(false);

      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  // delete account/profile
  const deleteAccount = async (e) => {
    setDeleteIsLoading(false);
    e.preventDefault();
    const res = await fetch("/api/auth/users", {
      method: "DELETE",
      body: JSON.stringify({ id: userInfo.id }),
    });
    setDeleteIsLoading(false);

    signOut();
  };

  // signout
  const logout = (e) => {
    setLogoutIsLoading(true);
    e.preventDefault();
    signOut();
    setLogoutIsLoading(false);
  };

  // change value to current value
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  if (isAuth)
    return (
      <>
        <main className="main pt-24">
          <MiniNav links={miniLinks} />
          <h2 className="text-3xl font-bold capitalize mb-3">user profile</h2>

  <div className="flex flex-col lg:flex-row">
  <div className="flex flex-col lg:w-1/2 w-full  lg:sticky h-max lg:top-32">
  <div className="mx-auto flex flex-col sm:flex-row lg:flex-col gap-3 justify-evenly items-center">
                  <div className="rounded-[100%] px-20 py-16 h-full font-bold capitalize text-6xl text-center text-yellow-500 dark:bg-[#3f434a] bg-gray-100 ">
                  {avatar[0]}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize">Name: {username[0]} {username[1]}</p>
                    <p>Email: {currentEmail}</p>
                    <p>Phone: {currentPhone}</p>
</div>
                </div>


                <div className="w-full flex mt-7 justify-evenly">
            <Button
              type="button"
              className="w-max bg-yellow-600 py-6 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={logoutIsLoading}
              onClick={logout}
            >
              {logoutIsLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              logout{" "}
            </Button>
            <Button
              type="button"
              className="w-max bg-red-600 py-6 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={deleteIsLoading}
              onClick={deleteAccount}
            >
              {deleteIsLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              delete account
            </Button>
          </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/2">

          <p className="w-[90%] sm:w-2/4 mx-auto mt-7">
                  Note: After clicking on "update user profile" you will be
                  logged out and redirected to the homepage. Re-sign in with
                  updated credentials to access your account
                </p>
          <form className="flex flex-col gap-y-5 mt-4 mx-auto w-[90%] sm:w-2/4 px-4 py-2">
          <div className="space-y-1 w-full sm:mx-auto">

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
              className="h-9 lg:w-[300px] w-full focus:outline-pink-200 dark:focus:outline-pink-300"
              //   defaultValue={defaultSearchQuery}
            />
            </div>
            <div className="space-y-1 w-full sm:mx-auto">
              <Label htmlFor="lname" className="text-base font-medium">
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
                className="h-9 lg:w-[300px] w-full focus:outline-pink-200 dark:focus:outline-pink-300"
                //   defaultValue={defaultSearchQuery}
              />
            </div>
            <div className="space-y-1 w-full sm:mx-auto">
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
                className="h-9 lg:w-[300px] w-full focus:outline-pink-200 dark:focus:outline-pink-300"
                //   defaultValue={defaultSearchQuery}
              />
              <div className="space-y-1 w-full sm:mx-auto">
                <Label htmlFor="password" className="text-base font-medium">
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
                  className="h-9 lg:w-[300px] w-full focus:outline-pink-200 dark:focus:outline-pink-300"
                  //   defaultValue={defaultSearchQuery}
                />
              </div>
            </div>
            {!showPassword && (
              <div className="space-y-1 mx-auto flex flex-col gap-y-3">
                <Label htmlFor="password" className="lg:w-[300px] mx-auto text-base font-medium">
                  Type in current password to update any user info
                </Label>
                
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="password123"
                  value={currentPassword}
                  onChange={handleChange}
                  className="h-9 lg:w-[300px] mt-5 mx-auto focus:outline-pink-200 dark:focus:outline-pink-300"
                  //   defaultValue={defaultSearchQuery}
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={comparePassword}
                  className="text-lg mt-5 mx-auto lg:w-[300px] w-full"
                >
                  check password
                </Button>
              </div>
            )}

            {showPassword && (
              <>
                <div className="space-y-1 mx-auto">
                  <Label htmlFor="password" className="text-base font-medium">
                    Re-enter old password if you wish to keep it or enter a new
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

                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="text-lg"
                  onClick={handleSubmit}
                  disabled={updateIsLoading}
                >
                  {updateIsLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  update user profile
                </Button>
              </>
            )}
          </form>
          </div>

    </div>        </main>
      </>
    );
};

export default Page;
