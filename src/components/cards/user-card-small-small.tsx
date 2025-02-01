import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserCardSmallSmall = () => {
  return (
    <div className=" flex space-x-1">
      <Avatar className=" size-8">
        <AvatarImage src="/images/2.jpg" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div className=" flex flex-col -space-y-1">
        <h4 className=" font-medium text-sm">Hakizimana Jea</h4>
        <span className=" text-myGray font-medium text-xs">TEACHER</span>
      </div>
    </div>
  );
};

export default UserCardSmallSmall;
