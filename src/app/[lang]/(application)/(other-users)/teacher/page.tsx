import { auth } from "@/auth";
import TeacherHomeBody from "@/components/app/teacher/teacher-home-body";
import { Locale } from "@/i18n";
import { Plus } from "lucide-react";
import Link from "next/link";
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

  const haveClass = true;
  return (
    <div className=" px-4">
      {!haveClass ? (
        <div className=" w-full grid place-content-center h-[80vh]">
          <Link
            className=" btn btn-info capitalize"
            href={`/${lang}/teacher/add-class`}
          >
            <Plus /> add class
          </Link>
        </div>
      ) : (
        <TeacherHomeBody lang={lang}/>
      )}
    </div>
  );
};

export default TeacherPage;
