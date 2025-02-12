import { auth } from "@/auth";
import AddMemberInClassDialog from "@/components/app/class/setting/add-class-member-dialog";
import UserCardSmallCallSetting from "@/components/cards/user-card-small-class-setting";
import NotFoundPage from "@/components/page/not-found-page";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { getSubjectByClassId } from "@/services/data/subject-data";
import { getTeachersByClassId } from "@/services/data/teacher-data";
import { getUserById } from "@/services/data/user";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassSettingPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  const getClass = await getClassById(classId);
  if (!getClass) return <NotFoundPage />;
  if (user.role !== "ADMIN" && getClass.userId !== user.id)
    return <PermissionPage />;
  const classSubjects = await getSubjectByClassId(classId);
  const getTeachers = await getTeachersByClassId(classId);
  return (
    <div className=" w-full space-y-4 pr-4">
      <div className=" space-y-2">
        <div className=" flex justify-between items-center mt-4 ">
          <h1 className="happy-title-head">Class member settings </h1>
          <AddMemberInClassDialog classId={classId} />
        </div>
        <p>
          Settings for all people in this class you can add them or remove or
          disable and other activities you want
        </p>
      </div>
      {getTeachers && (
        <div className=" mt-4">
          <div className=" flex justify-between w-full items-center">
            <h2 className=" happy-title-base">Class Teachers</h2>
            <AddMemberInClassDialog
              classSubjects={classSubjects}
              person="TEACHER"
              classId={classId}
            />
          </div>
          <div className=" mt-4 space-y-2">
            {getTeachers.map(async (item) => {
              const user = await getUserById(item.userId);
              return (
                <UserCardSmallCallSetting user={user} userRole="TEACHER" lang={lang} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSettingPeoplePage;
