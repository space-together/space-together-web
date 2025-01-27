import UserCard from "@/components/cards/user-card";
import React from "react";

const ClassClassmatePage = () => {
  return (
    <div className=" px-4 py-4">
      <div>
        <h1 className=" font-semibold text-2xl">Classmate </h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UserCard />
      </div>
    </div>
  );
};

export default ClassClassmatePage;
