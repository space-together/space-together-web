import React from "react";
import SchoolHomePosts from "./school-home-posts";
import SchoolHomeAbout from "./school-home-about";
import { Locale } from "@/i18n";
import SchoolContacts from "./school-contacts";
import SchoolStaff from "./school-staff";

interface props {
  lang: Locale;
}

const SchoolHomeBody = ({ lang }: props) => {
  return (
    <div className=" w-full space-y-4">
      <div className=" flex space-x-4 justify-between w-full">
        <SchoolHomePosts lang={lang} />
        <div className=" w-1/2 space-y-4">
          <SchoolHomeAbout />
          <SchoolContacts />
          <SchoolStaff />
        </div>
      </div>
    </div>
  );
};

export default SchoolHomeBody;
