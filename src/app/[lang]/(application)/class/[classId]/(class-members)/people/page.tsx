import UserCard from "@/components/cards/user-card";
import SearchPeopleClass from "@/components/app/class/people/search-people-class";
import React from "react";
import { Locale } from "@/i18n";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTeachersByClassId } from "@/services/data/teacher-data";
import { getUserById } from "@/services/data/user";
import { getModuleByTeacherInClassId } from "@/services/data/model-data";
import UserCardSmallCallSetting from "@/components/cards/user-card-small-class-setting";
import MyImage from "@/components/my-components/myImage";
import AddMemberInClassDialog from "@/components/app/class/setting/add-class-member-dialog";
import { getSubjectByClassId } from "@/services/data/subject-data";
import { getClassById } from "@/services/data/class-data";

interface props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const user = (await auth())?.user;
  if (!user) return redirect(`/${lang}/auth/login`);

  const [getTeachers, classSubjects, getClass] = await Promise.all([
    getTeachersByClassId(classId),
    getSubjectByClassId(classId),
    getClassById(classId),
  ]);

  const teacherCards = await Promise.all(
    getTeachers.map(async (item) => {
      const [user, getModels] = await Promise.all([
        getUserById(item.userId),
        getModuleByTeacherInClassId(item.id, classId),
      ]);
      return (
        <UserCardSmallCallSetting
          key={item.userId}
          modules={getModels}
          user={user}
          userRole="TEACHER"
          lang={lang}
        />
      );
    })
  );

  return (
    <div className="px-4 py-4 space-y-2">
      <SearchPeopleClass />
      {!!getTeachers && (
        <div className="space-y-2">
          <h2 className="happy-title-base">Teachers</h2>
          <div className="space-y-2 flex flex-col gap-2">
            {getTeachers.length === 0 ? (
              <div className="justify-center items-center space-y-2 flex flex-col">
                <MyImage src="/icons/teacher.png" className="size-16" />
                <p className="font-medium text-myGray">No teachers in this class!</p>
                {(getClass?.userId === user.id || user.role === "ADMIN") && (
                  <AddMemberInClassDialog
                    classId={classId}
                    classSubjects={classSubjects}
                    person="TEACHER"
                  />
                )}
              </div>
            ) : (
              teacherCards
            )}
          </div>
        </div>
      )}
      <div className="space-y-2">
        <h1 className="happy-title-base">Classmate</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, index) => (
            <UserCard key={index} lang={lang} />
          ))}
        </div>
      </div>
      <div className="h-screen" />
    </div>
  );
};

export default ClassPeoplePage;