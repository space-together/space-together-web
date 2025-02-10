import { auth } from "@/auth";
import AddMemberInClassDialog from "@/components/app/class/setting/add-class-member-dialog";
import UserCardSmallCallSetting from "@/components/cards/user-card-small-class-setting";
import { Locale } from "@/i18n";
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
  return (
    <div className=" w-full space-y-4 pr-4">
      class people setting page
      <div className=" mt-4">
        <div className=" flex justify-between w-full items-center">
        <h2  className=" happy-title-head">Class Teachers</h2>
        <AddMemberInClassDialog classId={classId}  person="TEACHER"/>
        </div>
        <div className=" mt-4">
          <UserCardSmallCallSetting userRole="TEACHER" lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default ClassSettingPeoplePage;
