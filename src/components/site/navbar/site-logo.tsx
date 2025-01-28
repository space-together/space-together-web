"use client"
import MyImage from "@/components/my-components/myImage";
import { cn } from "@/lib/utils";
import React from "react";

interface props {
  name ?: string
}

const SiteLogo = ({name} : props) => {
  return (
    <div className=" flex gap-2 items-center">
      <MyImage src="/logo/1.png" className=" size-10" />
      <div className=" flex flex-col">
        <h2 className={cn("font-semibold text-base text-start font-allura flex flex-row")}>
          space-together
        </h2>
        <span className="  my-sm-text">{name}</span>
      </div>
    </div>
  );
};

export default SiteLogo;

export const LoadingLogo = ({name} : props) => {
  return (
    <div className=" flex gap-2 items-center">
      <MyImage src="/logo/1.png" className=" size-10" />
      <div className=" flex flex-col">
        <h2 className={cn("font-semibold text-base text-start font-allura flex flex-row", "text-white")}>
          space-together
        </h2>
        <span className="  my-sm-text">{name}</span>
      </div>
    </div>
  );
};

