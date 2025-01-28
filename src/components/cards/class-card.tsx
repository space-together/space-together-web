import React from "react";
import MyImage from "../my-components/myImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { TextTooltip } from "@/context/tooltip/text-tooltip";

interface props {
  lang: Locale;
  isClassTeacher?: boolean;
}

const ClassCard = ({ lang, isClassTeacher }: props) => {
  return (
    <div className=" happy-card p-0 relative">
      <div className=" relative">
        <MyImage
          src="/images/7.jpg"
          className=" w-full h-28"
          classname=" card rounded-b-none"
        />
        <Separator />
        <div className=" -bottom-24 p-4 flex items-center gap-2 absolute">
          <Avatar className=" size-20">
            <AvatarImage src="/images/19.jpg" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className=" mt-6">
            <h3 className=" font-medium">Level 5 Software development</h3>
            <span className=" text-sm">@ L5SOD</span>
          </div>
        </div>
      </div>
      <div className=" p-4 flex gap-2 mt-16">
        <div className="  items-center -space-x-2 text-myGray flex">
          <Dot size={32} />
          <span className=" text-sm">
            32 <TextTooltip content={"Student"} trigger={"ST"} />
          </span>
        </div>
        <div className=" flex items-center -space-x-2 text-myGray">
          <Dot size={32} />
          <span className=" text-sm line">
            7  <TextTooltip content={"Teacher"} trigger={"TEA"} />
          </span>
        </div>
        <div className=" flex items-center -space-x-2 text-myGray">
          <Dot size={32} />
          <div className=" flex items-center space-x-2 text-sm">
            <Avatar className=" size-4">
              <AvatarImage src="/images/17.jpg" />
              <AvatarFallback className=" text-sm">LOGO</AvatarFallback>
            </Avatar>
            {/* add link of class teacher */}
            <Link
              className={cn(
                "line-clamp-1 link-hover",
                isClassTeacher ? "text-myGray" : ""
              )}
              href={`/${lang}/profile/1232`}
            >
              Mihingo karike
            </Link>
          </div>
        </div>
      </div>
      <div className=" px-4">
        <h5 className=" capitalize font-medium text-myGray">lessons</h5>
        <div className=" grid grid-cols-4 w-full">
          <div className=" flex items-center -space-x-2">
            <Dot size={32} />
            <span className=" text-sm line">Math</span>
          </div>
          <div className=" flex items-center -space-x-2">
            <Dot size={32} />
            <span className=" text-sm line">Kiny</span>
          </div>
          <div className=" flex items-center -space-x-2">
            <Dot size={32} />
            <span className=" text-sm line">Kisw</span>
          </div>
        </div>
      </div>
      <Separator />
      <div className=" p-4">
        {/* TODO: add link of class */}
        <Link
          href={`/${lang}/class/student`}
          className={cn("btn w-full", isClassTeacher && "btn-info")}
        >
          Join class
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;
