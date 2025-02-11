import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { authUser } from "@/types/userModel";
import { Class, SendUserRequest, User } from "../../../prisma/prisma/generated";
import { toLowerCase } from "@/utils/functions/characters";

interface props {
  lang: Locale;
  user: authUser;
  sender: User;
  getClass?: Class | null;
  notification: SendUserRequest;
}

const NotificationCard = ({ lang, sender, getClass, notification }: props) => {
  return (
    <div className={cn("happy-card flex-row justify-between")}>
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/${sender.id}`}>
          <Avatar className=" size-12">
            <AvatarImage src={sender.image ? sender.image : "/images/2.jpg"} />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/profile/student/${lang}/profile/${sender.id}`}>
            <div className=" flex space-x-2">
              <h4 className=" font-medium">
                {sender.name || "Murekezi Hindiro"}
              </h4>
              <span className=" font-medium text-myGray capitalize text-sm">
                {toLowerCase(sender.role)}
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
            <AvatarImage
              src={getClass?.symbol ? getClass.symbol : "/images/17.jpg"}
            />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <h5 className=" font-medium ">
            {getClass?.name ? getClass.name : "Class Name"}
          </h5>
          <span className=" text-myGray text-sm font-medium capitalize">
            {notification.type || "ask to join class"}
          </span>
        </div>
        <p>{notification.description}</p>
      </div>
      <div>
        <div className=" flex flex-col space-y-2">
          <Button variant="info" size="sm">
            Accept
          </Button>
          <span className=" text-sm font-medium text-myGray">
            {new Date(notification.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
