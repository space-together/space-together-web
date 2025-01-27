import ActivitiesCard from "@/components/cards/activities-card";
import SearchActivities from "@/components/class/class-work/search-activities";
import SelectClassActivitiesSubject from "@/components/class/class-work/select-class-activities-subject";
import React from "react";

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
