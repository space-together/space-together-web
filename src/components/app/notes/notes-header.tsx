import UserCardSmallSmall from "@/components/cards/user-card-small-small";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
interface props {
  lang: Locale;
}

const NotesHeader = ({}: props) => {
  return (
    <div className=" p-4 flex justify-between">
      <div className=" space-y-1">
        <h3 className=" font-semibold text-2xl">Machine learning</h3>
        <UserCardSmallSmall />
      </div>
      <Button variant="ghost" shape="circle">
        <BsExclamationCircle size={22} />
      </Button>
    </div>
  );
};

export default NotesHeader;
