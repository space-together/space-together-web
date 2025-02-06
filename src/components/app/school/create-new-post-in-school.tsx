import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const CreateNewPostInSchool = () => {
  return (
    <div>
      <div className=" items-center space-x-2 happy-card flex flex-row">
        <Avatar className=" size-12">
          <AvatarImage src="/images/2.jpg"
             onError={(e) => (e.currentTarget.src = "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg?t=st=1738836062~exp=1738839662~hmac=510ea2f9b13ba3cc58ae199263d0d0d9b1955c59aa634454b0c142d278ab7845&w=996")} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className=" w-full flex flex-col">
          <div className=" bg-base-200 w-full p-2 rounded-full px-4">
            <p>Announce something in school...</p>
          </div>
          <div>
            {/* TODO: add announcement in school dialog */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPostInSchool;
