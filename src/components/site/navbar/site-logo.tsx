"use client";
import MyImage from "@/components/my-components/myImage";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { authUser } from "@/types/userModel";
import { RedirectContents } from "@/utils/context/redirect-content";
import Link from "next/link";
import React from "react";

interface props {
  user?: authUser;
  lang: Locale;
}

const SiteLogo = ({ user, lang }: props) => {
  return (
    <Link
      href={`${user ? RedirectContents({ lang, role: user.role }) : "/"}`}
      className=" flex gap-2 items-center"
    >
      <MyImage src="/logo/1.png" className=" size-10" />
      <div className=" flex flex-col">
        <h2
          className={cn(
            "font-semibold text-base text-start font-allura flex flex-row"
          )}
        >
          space-together
        </h2>
      </div>
    </Link>
  );
};

export default SiteLogo;

export const LoadingLogo = () => {
  return (
    <div className=" flex gap-2 items-center">
      <MyImage src="/logo/1.png" className=" size-10" />
      <div className=" flex flex-col">
        <h2
          className={cn(
            "font-semibold text-base text-start font-allura flex flex-row",
            "text-white"
          )}
        >
          space-together
        </h2>
      </div>
    </div>
  );
};
