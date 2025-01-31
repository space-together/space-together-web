import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Locale } from "@/i18n";
import Link from "next/link";

interface props {
    lang : Locale
}

const MessageUserCard = ({lang} : props) => {
  return (
    <div className=" flex space-x-2">
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
