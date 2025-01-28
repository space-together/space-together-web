import PostCard from "@/components/cards/post-card";
import React from "react";

const ProfileBody = () => {
  return (
    <div className=" w-full space-y-4">
      <div className=" space-y-2">
        <h2 className=" font-semibold">Posts</h2>
        <div className=" grid grid-cols-3 w-full gap-4">
          <PostCard postRole="IMAGE" />
          <PostCard postRole="IMAGE" />
          <PostCard postRole="IMAGE" />
          <PostCard postRole="IMAGE" />
          <PostCard postRole="IMAGE" />
          <PostCard postRole="IMAGE" />
        </div>
        <div className=" happy-card justify-center items-center flex-row">
            <span className=" link">See More</span>
        </div>
      </div>
      <div className=" space-y-2">
        <h2 className=" font-semibold">Notes</h2>
        <div className=" grid grid-cols-3 w-full gap-4">
        <PostCard postRole="NOTES" />
          <PostCard postRole="NOTES" />
          <PostCard postRole="NOTES" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
