import UserCardSmall from "@/components/cards/user-card-small";
import { Locale } from "@/i18n";
import React from "react";

interface props {
    lang: Locale
}

const SchoolStaff = ({lang} : props) => {
  return (
    <div className=" happy-card space-y-2">
      <div className="">
        <h3 className=" font-semibold capitalize">school staff </h3>
      </div>
      <div className=" space-y-2 ml-2">
        <UserCardSmall lang={lang} userRole="DIRECTER"/>
        <UserCardSmall lang={lang} userRole="EDUCATION_PREFECT"/>
        <UserCardSmall lang={lang} userRole="DISCIPLINE_PREFECT"/>
      </div>
    </div>
  );
};

export default SchoolStaff;
