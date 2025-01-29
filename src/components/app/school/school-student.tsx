import UserCardSmall from "@/components/cards/user-card-small";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import React from "react";

interface props {
  lang: Locale;
}

const SchoolStudents = ({ lang }: props) => {
  return (
    <div className=" happy-card space-y-2">
      <div className="">
        <h3 className=" font-semibold capitalize">school staff </h3>
      </div>
      <div className=" space-y-2 ml-2">
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
      </div>
      <Button variant="ghost" size="sm">See More</Button>
    </div>
  );
};

export default SchoolStudents;
