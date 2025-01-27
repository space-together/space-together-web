import ActivitiesCard from "@/components/cards/activities-card";
import SearchActivities from "@/components/class/class-work/search-activities";
import React from "react";
import SelectClassActivitiesSubject from "./select-class-activities-subject";

const ClassWorkPage = () => {
  return (
    <div className=" p-4">
      <SearchActivities />
      <div>
        <SelectClassActivitiesSubject />
      <div>
      <ActivitiesCard />
      </div>
      </div>
    </div>
  );
};

export default ClassWorkPage;
