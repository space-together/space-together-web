"use client";
 import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MyImage from "../my-components/myImage";
import { Locale } from "@/i18n";
import { FaGithub } from "react-icons/fa"
import { oauth2ProviderUrl } from "@/services/auth/core/oauth2";

interface props {
  lang : Locale
}
const AuthProviders = ({} : props) => {
  return (
    <div className=" w-full mt-2 space-y-6">
      <div className=" flex flex-col w-full items-center relative  pt-4">
        <p className=" bg-base-100 absolute top-1 px-2">Or continuer with</p>
        <Separator />
        
      </div>
      <div className=" flex  w-full space-x-2">
        <Button onClick={() => oauth2ProviderUrl("Discord")} variant="outline" className=" w-1/2">
          <MyImage
            src="/icons/discord.png"
            className="size-4 "
          />
          Discord
        </Button>
        <Button onClick={() => oauth2ProviderUrl("Discord")} variant="outline" className=" w-1/2">
          <FaGithub size={18}/>
          Github
        </Button>
      </div>
    </div>
  );
};

export default AuthProviders;
