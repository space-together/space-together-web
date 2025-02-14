import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import ProfileHeaderSocialAccount from "./profile-header-social-accounts";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
import { Locale } from "@/i18n";
import { LuMessageCircle } from "react-icons/lu";
import { authUser } from "@/types/userModel";
import MyImage from "@/components/my-components/myImage";
import { toLowerCase } from "@/utils/functions/characters";

interface props {
    lang : Locale
    OtherUser ?: boolean;
    user : authUser
}

const ProfileHeader = ({lang , OtherUser, user} : props) => {
  
  return (
    <div className=" my-4 flex flex-row justify-between items-center">
      <div className=" flex gap-2 items-center">
        <MyImage role="AVATAR" className=" size-32" src={!!user?.image ? user.image : "/images/2.jpg"}/>
        <div className=" flex flex-col space-y-1">
          <h4 className=" text-lg font-semibold">{user.name}</h4>
          {!!user?.username &&<span className=" text-sm to-myGray">@ {user.username}</span>}
          <span className=" text-sm font-semibold text-myGray capitalize">{toLowerCase(user.role)}</span>
          <div className=" flex gap-2 items-center">
            <Avatar className=" size-6">
              <AvatarImage src="/images/19.jpg" />
              <AvatarFallback>PROFILE</AvatarFallback>
            </Avatar>
            <h5 className=" text-sm link-hover">
              SOS Technical school School{" "}
            </h5>
          </div>
          <Link href={`/${lang}/class/student`} className=" flex gap-2 items-center">
            <Avatar className=" size-6">
              <AvatarImage src="/images/17.jpg" />
              <AvatarFallback>PROFILE</AvatarFallback>
            </Avatar>
            {/* TODO: add school link */}
            <h5 className=" text-sm link-hover">L5 SOD</h5>
          </Link>
        </div>
      </div>
      {/* other user social accounts */}
      <ProfileHeaderSocialAccount />
      {/* make action */}
      <Link href={`/${lang}/${OtherUser ? "messages/user" : "settings"}`}>
        <Button variant="info" className=" ">
          {OtherUser ? <LuMessageCircle/> :<AiOutlineSetting size={20}/> }
            {OtherUser ? "Message" : "Settings"}
        </Button>
      </Link>
    </div>
  );
};

export default ProfileHeader;
