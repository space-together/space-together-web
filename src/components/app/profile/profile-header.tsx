import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import ProfileHeaderSocialAccount from "./profile-header-social-accounts";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
import { Locale } from "@/i18n";

interface props {
    lang : Locale
}

const ProfileHeader = ({lang} : props) => {
  return (
    <div className=" happy-card flex flex-row justify-between items-center">
      <div className=" flex gap-2">
        <Avatar className=" size-32">
          <AvatarImage src="/images/2.jpg" />
          <AvatarFallback>PROFILE</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col space-y-1">
          <h4 className=" text-lg font-semibold">Hakorimana Happy</h4>
          <span className=" text-sm to-myGray">@ hakorimana__</span>
          <span className=" text-sm font-semibold text-myGray">STUDENT</span>
          <div className=" flex gap-2 items-center">
            <Avatar className=" size-6">
              <AvatarImage src="/images/19.jpg" />
              <AvatarFallback>PROFILE</AvatarFallback>
            </Avatar>
            {/* TODO: add school link */}
            <h5 className=" text-sm link-hover">
              SOS Technical school School{" "}
            </h5>
          </div>
          <div className=" flex gap-2 items-center">
            <Avatar className=" size-6">
              <AvatarImage src="/images/17.jpg" />
              <AvatarFallback>PROFILE</AvatarFallback>
            </Avatar>
            {/* TODO: add school link */}
            <h5 className=" text-sm link-hover">L5 SOD</h5>
          </div>
        </div>
      </div>
      {/* other user social accounts */}
      <ProfileHeaderSocialAccount />
      {/* make action */}
      <Link href={`/${lang}/settings`}>
        <Button variant="info" className=" ">
            <AiOutlineSetting size={20}/>
            Settings
        </Button>
      </Link>
    </div>
  );
};

export default ProfileHeader;
