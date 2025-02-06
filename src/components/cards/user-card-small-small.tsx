import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserCardSmallSmall = () => {
  return (
    <div className=" flex space-x-1">
      <Avatar className=" size-8">
        <AvatarImage src="/images/2.jpg"
             onError={(e) => (e.currentTarget.src = "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg?t=st=1738836062~exp=1738839662~hmac=510ea2f9b13ba3cc58ae199263d0d0d9b1955c59aa634454b0c142d278ab7845&w=996")} />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div className=" flex flex-col -space-y-1">
        <h5 className=" font-medium text-sm">Hakizimana Jea</h5>
        <span className=" text-myGray font-medium text-xs">TEACHER</span>
      </div>
    </div>
  );
};

export default UserCardSmallSmall;
