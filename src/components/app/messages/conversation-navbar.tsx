import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";

interface props {
  lang : Locale
}

const ConversationNavbar = ({lang} : props) => {
  return (
    <nav className=" h-12 bg-base-100 border-b border-b-border px-4 flex items-center">
      <div className=" flex space-x-2">
        <Avatar className=" size-10">
          <AvatarImage src="/images/2.jpg"
             onError={(e) => (e.currentTarget.src = "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg?t=st=1738836062~exp=1738839662~hmac=510ea2f9b13ba3cc58ae199263d0d0d9b1955c59aa634454b0c142d278ab7845&w=996")} />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col">
          <Link href={`/${lang}/profile/student`}><h3 className=" font-medium"> Bruno Happy heart</h3></Link>
          <span className=" font-medium text-myGray text-sm">STUDENT</span>
        </div>
      </div>
    </nav>
  );
};

export default ConversationNavbar;
