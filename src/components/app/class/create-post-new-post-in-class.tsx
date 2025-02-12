"use client";
import CreatePostForm from "@/components/form/create-post-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authUser } from "@/types/userModel";
import React, { useState } from "react";

interface props {
  classId?: string;
  user?: authUser;
}

const CreateNewPostInClass = ({ classId, user }: props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {!isOpen ? (
        <div
          role="button"
          onClick={() => setIsOpen(true)}
          className=" items-center space-x-2 happy-card flex flex-row"
        >
          <Avatar className=" size-12">
            <AvatarImage src={user?.image ? user.image : "/images/2.jpg"} />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <div className=" w-full flex flex-col">
            <div className=" bg-base-200 w-full p-2 rounded-full px-4">
              <p>Announce something in class...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className=" happy-card space-y-2">
          <CreatePostForm user={user} classId={classId} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default CreateNewPostInClass;
