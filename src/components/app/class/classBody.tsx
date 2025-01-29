import React from "react";
import CreateNewPostInClass from "./create-post-new-post-in-class";
import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";

interface props {
  lang : Locale
}

const ClassBody = ({lang} : props) => {
  return (
    <div className=" sm:w-1/2 space-y-4">
      <CreateNewPostInClass />
      {/* simple of notes */}
      <PostCard lang={lang} postRole="NOTES"/>
      <PostCard lang={lang} postRole="IMAGE"/>
      <PostCard lang={lang} postRole="NOTES"/>
      <PostCard lang={lang} postRole="IMAGE"/>
      <PostCard lang={lang} postRole="NOTES"/>
      <PostCard lang={lang} postRole="IMAGE"/>
      <div className=" h-screen"/>
    </div>
  );
};

export default ClassBody;
