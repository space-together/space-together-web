import { auth } from "@/auth";
import CreateClassDialog from "@/components/app/class/createClassDialog";
import TeacherHomeBody from "@/components/app/teacher/teacher-home-body";
import ErrorPage from "@/components/page/error-page";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import {
  getAllClassesByUserId,
  getClassesByTeacherId,
} from "@/services/data/class-data";
import {
  getTeacherByUserId,
} from "@/services/data/teacher-data";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  params: Promise<{ lang: Locale }>;
}

const TeacherPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user?.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const classes = await getAllClassesByUserId(user.id);
  if (!classes) return <ErrorPage />;

  const getTeacher = await getTeacherByUserId(user.id);
  if (user.role !== "TEACHER" && user.role !== "ADMIN") {
    return <PermissionPage />;
  }

  const teacherClasses = getTeacher
    ? await getClassesByTeacherId(getTeacher.id)
    : null;

  return (
    <div className=" px-4">
      {classes.length === 0 ? (
        <div className=" w-full grid place-content-center h-[80vh]">
          <CreateClassDialog />
        </div>
      ) : (
        <TeacherHomeBody
          teacherClasses={teacherClasses}
          classes={classes}
          lang={lang}
        />
      )}
    </div>
  );
};

export default TeacherPage;
