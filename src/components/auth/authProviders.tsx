"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MyImage from "../my-components/myImage";
import { Locale } from "@/i18n";
import { FaGithub } from "react-icons/fa"
import { loginWithProvidesService } from "@/utils/service/auth/loginService";

interface props {
  lang : Locale
}
const AuthProviders = ({lang} : props) => {
  return (
    <div className=" w-full mt-2 space-y-6">
      <div className=" flex flex-col w-full items-center relative  pt-4">
        <p className=" bg-base-300 absolute top-1 px-2">Or continuer with</p>
        <Separator />
      </div>
      <div className=" mt-3 space-y-2">
        <Button onClick={() => loginWithProvidesService("google", lang)} variant="outline" className=" w-full">
          <MyImage
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            className="size-4"
          />
          Google
        </Button>
        <Button onClick={() => loginWithProvidesService("github", lang)} variant="outline" className=" w-full">
          <FaGithub size={18}/>
          Github
        </Button>
      </div>
    </div>
  );
};

export default AuthProviders;
