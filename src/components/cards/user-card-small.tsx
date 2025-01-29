import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toLowerCase } from "@/utils/functions/characters";
import { Button } from "../ui/button";
import { LuMessageCircle } from "react-icons/lu";

interface props {
  userRole: "DIRECTER" | "EDUCATION_PREFECT" | "DISCIPLINE_PREFECT";
}

const UserCardSmall = ({ userRole }: props) => {
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex space-x-2">
        <Avatar className=" size-12">
          <AvatarImage src="/images/2.jpg" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div>
          <h4 className=" font-medium">Murekezi Hindiro</h4>
          <span className=" font-medium text-myGray capitalize">
            {toLowerCase(userRole)}
          </span>
        </div>
      </div>
      <Button variant="info" size="sm">
        <LuMessageCircle />
        Message
      </Button>
    </div>
  );
};

export default UserCardSmall;
