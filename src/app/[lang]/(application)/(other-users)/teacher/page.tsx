import { auth } from "@/auth";
import ClassCard from "@/components/cards/class-card";
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
      {!haveClass ? <div className=" w-full grid place-content-center h-[80vh]">
        <Link className=" btn btn-info capitalize" href={`/${lang}/teacher/add-class`}>
          <Plus /> add class
        </Link>
      </div> : <div className="py-4">
        <div className=" grid grid-cols-3 gap-4">
          <ClassCard lang={lang}/>
          <ClassCard isSchool isClassTeacher lang={lang}/>
          <ClassCard isSchool lang={lang}/>
          <ClassCard isClassTeacher lang={lang}/>
        </div>
        </div>}
    </div>
  );
};

export default TeacherPage;
