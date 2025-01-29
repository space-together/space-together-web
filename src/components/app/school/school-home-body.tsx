import React from "react";
import SchoolHomePosts from "./school-home-posts";
import SchoolHomeAbout from "./school-home-about";
import { Locale } from "@/i18n";

interface props {
    lang : Locale
}

const SchoolHomeBody = ({lang} : props) => {
  return (
    <div className=" w-full space-y-4">
      <div className=" flex space-x-4 justify-between w-full">
        <SchoolHomePosts lang={lang}/>
        <SchoolHomeAbout />
      </div>
    </div>
  );
};

export default SchoolHomeBody;
