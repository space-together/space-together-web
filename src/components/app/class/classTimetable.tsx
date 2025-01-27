import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ClassTimetable = () => {
  return (
    <div className=" happy-card  h-80 p-0">
      <div className=" flex justify-between p-4 items-center">
        <h2 className=" font-medium text-lg">L5SOD Time Table</h2>
        <div>
          <Button variant="ghost" size="sm" shape="circle">
            <BsThreeDotsVertical />
          </Button>
        </div>
      </div>
      <Separator />
      <div>
        {/* time head */}
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default ClassTimetable;
