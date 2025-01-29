import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toLowerCase } from "@/utils/functions/characters";
import { Button } from "../ui/button";
import { LuMessageCircle } from "react-icons/lu";
import Link from "next/link";
import { Locale } from "@/i18n";

interface props {
  userRole: "DIRECTER" | "EDUCATION_PREFECT" | "DISCIPLINE_PREFECT";
  lang: Locale;
}

const UserCardSmall = ({ userRole, lang }: props) => {
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/student`}>
          <Avatar className=" size-12">
            <AvatarImage src="/images/2.jpg" />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/${lang}/profile/student`}>
            <h4 className=" font-medium">Murekezi Hindiro</h4>
          </Link>
          <span className=" font-medium text-myGray capitalize">
            {toLowerCase(userRole)}
          </span>
        </div>
      </div>
      <Link href={`/${lang}/message/12334`}>
        <Button variant="info" size="sm">
          <LuMessageCircle />
          Message
        </Button>
      </Link>
    </div>
  );
};

export default UserCardSmall;
