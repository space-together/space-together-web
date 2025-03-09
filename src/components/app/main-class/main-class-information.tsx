import React from "react";
import MainClassInformationSubjects from "./main-class-information-subjects";

const MainClassInformation = () => {
  return (
    <div className=" happy-card space-y-2">
      <div>
        <h3 className=" happy-title-base">Subjects</h3>
        <MainClassInformationSubjects />
      </div>
    </div>
  );
};

export default MainClassInformation;
