import NoteCard from "@/components/cards/note-card";
import React from "react";
import CreateNewPostInClass from "./create-post-new-post-in-class";

const ClassBody = () => {
  return (
    <div className=" sm:w-1/2 space-y-4">
      <CreateNewPostInClass />
      {/* simple of notes */}
      <NoteCard />
    </div>
  );
};

export default ClassBody;
