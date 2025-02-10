import { auth } from "@/auth";
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
      class people setting page{" "}
      <div className=" mt-4">
        <h2>Class Teachers</h2>
        <div className=" mt-4">
          <UserCardSmallCallSetting userRole="TEACHER" lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default ClassSettingPeoplePage;
