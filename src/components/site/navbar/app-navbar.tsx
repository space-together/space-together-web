"use client";
import SiteLogo from "./site-logo";
import Link from "next/link";
import { Locale } from "@/i18n";
import MyImage from "@/components/my-components/myImage";
import { authUser } from "@/types/userModel";
import NavProfileDropDown from "./nav-profile-drop-down";

interface props {
  lang: Locale;
  user: authUser;
}

const AppNavbar = ({ lang, user }: props) => {
  return (
    <nav className=" w-full h-14 max-h-14 fixed border-b border-border p-2 flex justify-between">
      <div className=" flex">
        <SiteLogo />
      </div>
      <div className=" flex gap-2 items-center mr-4">
        <Link className=" btn btn-circle btn-ghost" href={`/${lang}/message`}>
          <MyImage className=" size-8" src="/icons/chat.png" />
        </Link>
        <div role="button" className=" btn btn-circle btn-ghost">
          <MyImage className=" size-8" src="/icons/bell.png" />
        </div>
        <NavProfileDropDown lang={lang} user={user} />
      </div>
    </nav>
  );
};

export default AppNavbar;
