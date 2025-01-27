import React from "react";
import CreateNewPostInClass from "./create-post-new-post-in-class";
import PostCard from "@/components/cards/post-card";

const ClassBody = () => {
  return (
    <div className=" sm:w-1/2 space-y-4">
      <CreateNewPostInClass />
      {/* simple of notes */}
      <PostCard postRole="NOTES"/>
      <PostCard postRole="IMAGE"/>
      <PostCard postRole="NOTES"/>
      <PostCard postRole="IMAGE"/>
      <PostCard postRole="NOTES"/>
      <PostCard postRole="IMAGE"/>
      <div className=" h-screen"/>
    </div>
  );
};

export default ClassBody;
