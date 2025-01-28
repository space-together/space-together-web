import React from "react";
import MyImage from "../my-components/myImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Dot } from "lucide-react";

const ClassCard = () => {
  return (
    <div className=" happy-card p-0 h-96 relative">
      <div className=" relative">
        <MyImage
          src="/images/7.jpg"
          className=" w-full h-24"
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
          <span className=" text-sm">32 Student</span>
        </div>
        <div className=" flex items-center -space-x-2 text-myGray">
          <Dot size={32} />
          <span className=" text-sm line">7 Teacher</span>
        </div>
        <div className=" flex items-center -space-x-2 text-myGray">
          <Dot size={32} />
          <div className=" flex items-center space-x-2 text-sm">
            <Avatar className=" size-4">
              <AvatarImage src="/images/17.jpg" />
              <AvatarFallback>LOGO</AvatarFallback>
            </Avatar>
            <span className=" line-clamp-1">Mihingo karike</span>
          </div>
        </div>
      </div>
      {/* <Separator />
      <div className=" p-0">
        
      </div> */}
    </div>
  );
};

export default ClassCard;
