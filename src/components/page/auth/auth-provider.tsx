"use client";

import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AuthProviders = () => {
  return (
    <div className=" w-full mt-2 space-y-6">
      <div className=" flex flex-col  w-full gap-2" >
        <Button
          size={"md"}
          variant="outline"
          library="daisy"
          className="  border"
        >
          <MyImage src="/icons/google.png" className="size-4 " />
          Google
        </Button>
        <Button
          size={"md"}
          variant="outline"
          library="daisy"
          className="  border"
        >
          <MyImage src="/icons/facebook.png" className="size-4 " />
          Facebook
        </Button>
      </div>
      <div className=" flex flex-col w-full items-center relative  p-4">
        <p className=" bg-base-200 absolute top-1 px-2">Or continuer with</p>
        <Separator />
      </div>
    </div>
  );
};

export default AuthProviders;
