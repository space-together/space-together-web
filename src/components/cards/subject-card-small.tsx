import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SubjectCardSmall = () => {
  return (
    <div>
      <Avatar className=" size-12">
        <AvatarImage src="/icons/book.png" />
        <AvatarFallback>ICON</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default SubjectCardSmall;
