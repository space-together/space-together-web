import MyImage from "@/components/my-components/myImage";
import React from "react";

const SubjectHeader = () => {
  return (
    <div className=" flex flex-col  w-full space-y-4">
      <div className=" flex space-x-6 items-center">
        <MyImage src="/images/1.jpg" classname=" card " className=" size-20" />
        <div>
          <h2 className=" happy-title-head">Subject Name</h2>
          <span className=" happy-title-base">DY123P</span>
        </div>
      </div>
      <div className=" ">
        {/* level */}
        <div className=" flex space-x-2">
          <span className=" happy-title-base">Class room:</span>
          <span className=" text-lg font-medium">Level 5 Software development</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader;
