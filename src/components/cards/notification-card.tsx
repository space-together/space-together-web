import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { authUser } from "@/types/userModel";

interface props {
  lang: Locale;
  user : authUser;
}

const NotificationCard = ({ lang, }: props) => {
  return (
    <div className={cn("happy-card flex-row justify-between")}>
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/student`}>
          <Avatar className=" size-12">
            <AvatarImage src="/images/2.jpg" />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/${lang}/profile/student`}>
            <div className=" flex space-x-2">
              <h4 className=" font-medium">Murekezi Hindiro</h4>
              <span className=" font-medium text-myGray capitalize text-sm">
                Student
              </span>
            </div>
          </Link>
          <div className=" flex items-center">
            <span className=" font-medium text-myGray capitalize">Sender</span>
          </div>
        </div>
      </div>
      {/* notification */}
      <div className=" flex space-x-2 items-center flex-col">
        <div className=" flex gap-2 items-center">
        <Avatar className=" size-4">
          <AvatarImage src="/images/2.jpg" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <h5 className=" font-medium ">Class Name</h5>
        <span className=" text-myGray text-sm font-medium capitalize">
            ask to join class
        </span>
        </div>
        <p>Ask to join class and be teacher</p>
      </div>
      <div>
        <Button variant="info" size="sm">Accept</Button>
      </div>
    </div>
  );
};

export default NotificationCard;
