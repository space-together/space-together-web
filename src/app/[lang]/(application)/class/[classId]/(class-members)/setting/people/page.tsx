import { auth } from "@/auth";
import AddMemberInClassDialog from "@/components/app/class/setting/add-class-member-dialog";
import UserCardSmallCallSetting from "@/components/cards/user-card-small-class-setting";
import { Locale } from "@/i18n";
import { getSubjectByClassId } from "@/services/data/subject-data";
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
  const classSubjects = await getSubjectByClassId(classId);
  return (
    <div className=" w-full space-y-4 pr-4">
    <div>
    <div className=" flex justify-between items-center mt-4">
        <h1 className="happy-title-head">Class member settings </h1>
        <AddMemberInClassDialog classId={classId} />
      </div>
      <p>Settings for all people in this class you can add them or remove or disable and other activities you want</p>
    </div>
      <div className=" mt-4">
        <div className=" flex justify-between w-full items-center">
        <h2  className=" happy-title-base">Class Teachers</h2>
        <AddMemberInClassDialog classSubjects={classSubjects} person="TEACHER" classId={classId} />
        </div>
        <div className=" mt-4">
          <UserCardSmallCallSetting userRole="TEACHER" lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default ClassSettingPeoplePage;
