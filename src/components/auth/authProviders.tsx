"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MyImage from "../my-components/myImage";
import { signIn } from "@/auth";

const AuthProviders = () => {
  const onClick = (provide: "google" | "github") => {
    signIn(provide);
  };
  return (
    <div className=" w-full mt-2 space-y-6">
      <div className=" flex flex-col w-full items-center relative  pt-4">
        <p className=" bg-base-300 absolute top-1 px-2">Or continuer with</p>
        <Separator />
      </div>
      <div className=" mt-3">
        <Button onClick={() => onClick("google")} variant="outline" className=" w-full">
          <MyImage
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            className="size-4"
          />
          Google
        </Button>
      </div>
    </div>
  );
};

export default AuthProviders;
