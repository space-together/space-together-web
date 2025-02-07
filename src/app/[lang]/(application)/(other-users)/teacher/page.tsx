import { auth } from "@/auth";
import CreateClassDialog from "@/components/app/class/createClassDialog";
import TeacherHomeBody from "@/components/app/teacher/teacher-home-body";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  params: Promise<{ lang: Locale }>;
}

const TeacherPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  const haveClass = false;
  return (
    <div className=" px-4">
      {!haveClass ? (
        <div className=" w-full grid place-content-center h-[80vh]">
          <CreateClassDialog />
        </div>
      ) : (
        <TeacherHomeBody lang={lang}/>
      )}
    </div>
  );
};

export default TeacherPage;
