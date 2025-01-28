import UserCard from "@/components/cards/user-card";
import SearchPeopleClass from "@/components/app/class/people/search-people-class";
import React from "react";
import { Locale } from "@/i18n";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ClassPeoplePage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" px-4 py-4 space-y-2">
      <SearchPeopleClass />
      <div className="space-y-2">
        <h1 className=" font-semibold text-2xl">Teacher </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserCard lang={lang} userRole="TEACHER" />
          <UserCard lang={lang} userRole="TEACHER" />
          <UserCard lang={lang} userRole="TEACHER" />
        </div>
      </div>
      <div className=" space-y-2">
        <h1 className=" font-semibold text-2xl">Classmate </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserCard lang={lang} />
          <UserCard lang={lang} />
          <UserCard lang={lang} />
          <UserCard lang={lang} />
        </div>
      </div>
      <div className=" h-screen" />
    </div>
  );
};

export default ClassPeoplePage;
