import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ActivitiesCard = () => {
  return (
    <div className=" happy-card w-96 p-0">
      <div className=" flex p-4 space-x-2">
        <Avatar className=" size-12">
          <AvatarImage src="/images/2.jpg"
             onError={(e) => (e.currentTarget.src = "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg?t=st=1738836062~exp=1738839662~hmac=510ea2f9b13ba3cc58ae199263d0d0d9b1955c59aa634454b0c142d278ab7845&w=996")} />
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
