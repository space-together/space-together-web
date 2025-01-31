import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";

interface props {
  lang: Locale;
}

const OtherData1 = ({ lang }: props) => {
  return (
    <SidebarMenuSubItem>
      <Link
        href={`/${lang}/class/student`}
        className=" flex space-x-1 btn btn-ghost mb-2 justify-start items-center"
      >
        <Avatar className=" size-10 space-x-2">
          <AvatarImage src="/images/1.jpg" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col items-start">
          <h5 className=" font-medium">Class names</h5>
          <span>@ L5SOD</span>
        </div>
      </Link>
    </SidebarMenuSubItem>
  );
};

export default OtherData1;
