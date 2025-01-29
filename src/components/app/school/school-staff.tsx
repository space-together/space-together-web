import UserCardSmall from "@/components/cards/user-card-small";
import React from "react";

const SchoolStaff = () => {
  return (
    <div className=" happy-card space-y-2">
      <div className="">
        <h3 className=" font-semibold capitalize">school staff </h3>
      </div>
      <div className=" space-y-2 ml-2">
        <UserCardSmall userRole="DIRECTER"/>
        <UserCardSmall userRole="EDUCATION_PREFECT"/>
        <UserCardSmall userRole="DISCIPLINE_PREFECT"/>
      </div>
    </div>
  );
};

export default SchoolStaff;
