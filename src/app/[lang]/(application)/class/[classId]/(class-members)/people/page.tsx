import UserCard from "@/components/cards/user-card";
import SearchPeopleClass from "@/components/app/class/people/search-people-class";
import React from "react";
import { Locale } from "@/i18n";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTeachersByClassId } from "@/services/data/teacher-data";
import { getUserById } from "@/services/data/user";
import { getModuleByTeacherInClassId } from "@/services/data/model-data";

interface props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  const getTeachers = await getTeachersByClassId(classId);

  return (
    <div className=" px-4 py-4 space-y-2">
      <SearchPeopleClass />
      {!!getTeachers && (
        <div className="space-y-2">
          <h1 className=" font-semibold text-2xl">Teacher </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTeachers.map(async(item) => {
              const getUser = await getUserById(item.userId);
              const getModules = await getModuleByTeacherInClassId(item.id , classId);
              return <UserCard modules={getModules} key={item.id} user={getUser} lang={lang} />;
            })}
          </div>
        </div>
      )}
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
