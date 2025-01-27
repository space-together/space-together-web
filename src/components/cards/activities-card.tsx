import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ActivitiesCard = () => {
  return (
    <div className=" happy-card w-96 p-0">
      <div className=" flex p-4 space-x-2">
        <Avatar className=" size-12">
          <AvatarImage src="/images/2.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <div>
            <h4 className=" font-medium">Iradukunda Mike</h4>
            <span className=" text-sm text-myGray">Teacher</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesCard;
