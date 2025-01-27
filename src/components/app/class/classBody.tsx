import NoteCard from "@/components/cards/note-card";
import React from "react";
import CreateNewPostInClass from "./create-post-new-post-in-class";
import PostImageCard from "@/components/cards/post-image.card";

const ClassBody = () => {
  return (
    <div className=" sm:w-1/2 space-y-4">
      <CreateNewPostInClass />
      {/* simple of notes */}
      <NoteCard />
      <PostImageCard />
      <NoteCard />
      <PostImageCard />
      <NoteCard />
      <PostImageCard />
      <div className=" h-screen"/>
    </div>
  );
};

export default ClassBody;
