"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Locale } from "@/i18n";
import Link from "next/link";
import UseTheme from "@/context/theme/use-theme";
import { cn } from "@/lib/utils";

interface props {
    lang : Locale
}

const MessageUserCard = ({lang} : props) => {
  const theme = UseTheme();
  return (
    <div className={cn(" flex space-x-2  duration-200 p-2 card flex-row", theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/10")}>
      <Avatar className=" size-12">
        <AvatarImage src="/images/17.jpg" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div>
        <Link href={`/${lang}/messages/student`} className=" flex justify-between items-center">
          <h4 className=" line-clamp-1"> Uwiman Like</h4>
          <span className=" text-xs text-myGray font-medium">2min ago</span>
        </Link>
        <p className=" text-sm line-clamp-1 text-myGray">
          Mwiriwe neza ejo muzaza school
        </p>
      </div>
    </div>
  );
};

export default MessageUserCard;
