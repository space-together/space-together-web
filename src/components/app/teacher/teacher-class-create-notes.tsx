import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { Button } from "@/components/ui/button";

const TeacherClassCreateNotes = () => {
  return (
    <div className="happy-card">
      <h3 className=" happy-title-base">Your lessons</h3>
      <div className=" flex flex-col space-y-1">
        <Button
          variant="ghost"
          size="md"
          className=" flex justify-between items-center"
        >
          <div className="flex space-x-2 ">
            <CgNotes />
            <span>Physics</span>
          </div>
          <div>
            <IoAddCircleSharp size={24} />
          </div>
        </Button>
        <Button
          variant="ghost"
          size="md"
          className=" flex justify-between items-center"
        >
          <div className="flex space-x-2 ">
            <CgNotes />
            <span>Maths</span>
          </div>
          <div>
            <IoAddCircleSharp size={24} />
          </div>
        </Button>
        <Button
          variant="ghost"
          size="md"
          className=" flex justify-between items-center"
        >
          <div className="flex space-x-2 ">
            <CgNotes />
            <span>English</span>
          </div>
          <div>
            <IoAddCircleSharp size={24} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default TeacherClassCreateNotes;
