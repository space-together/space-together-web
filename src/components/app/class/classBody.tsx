import React from "react";
import CreateNewPostInClass from "./create-post-new-post-in-class";
import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import TeacherClassCreateNotes from "../teacher/teacher-class-create-notes";

interface props {
  lang : Locale,
  isTeacher ?: boolean;
  classId ?: string
}

const ClassBody = ({lang , isTeacher , classId} : props) => {
  return (
    <div className="w-full space-y-4">
      <CreateNewPostInClass classId={classId}/>
      {isTeacher && <TeacherClassCreateNotes />}
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
