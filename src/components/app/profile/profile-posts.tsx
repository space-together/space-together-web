import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import React from "react";
import { FaSignsPost } from "react-icons/fa6";
interface props {
  lang: Locale;
  onThePage?: boolean;
}

const ProfilePosts = ({ lang, onThePage }: props) => {
  return (
    <div className=" space-y-2">
      {!onThePage && (
        <div className=" space-x-1 flex items-center">
          <FaSignsPost />
          <h2 className=" font-semibold">Posts</h2>
        </div>
      )}
      <div className=" grid grid-cols-3 w-full gap-4">
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
      </div>
      {!onThePage && (
        <div className=" happy-card justify-center items-center flex-row">
          <span className=" link">See More</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
