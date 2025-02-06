import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { Locale } from "@/i18n";
import UserTooltip from "@/context/tooltip/user-tooltip";

interface props {
  lang: Locale;
}

const PostCardHeader = ({ lang }: props) => {
  const imageSrc = "/images/2.jpg";
  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div className=" flex items-center space-x-2">
        <Link href={`/${lang}/profile/user`}>
          <UserTooltip
            lang={lang}
            trigger={
              <Avatar className=" size-12">
                <AvatarImage src={ imageSrc ||"https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg?t=st=1738836062~exp=1738839662~hmac=510ea2f9b13ba3cc58ae199263d0d0d9b1955c59aa634454b0c142d278ab7845&w=996"} />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
            }
          />
        </Link>
        <Link href={`/${lang}/profile/user`}>
          <h4 className=" font-medium">Iradukunda Mike</h4>
          <span className=" text-sm text-myGray">Teacher</span>
        </Link>
      </div>
      <div className=" flex gap-2 items-center">
        <span className=" font-medium text-myGray">2h ago</span>
        <Button variant="ghost" size="sm" shape="circle">
          <BsThreeDotsVertical />
        </Button>
      </div>
    </div>
  );
};

export default PostCardHeader;
