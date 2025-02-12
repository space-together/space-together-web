import { auth } from "@/auth";
import SubjectCardSmall from "@/components/cards/subject-card-small";
import NotFoundPage from "@/components/page/not-found-page";
import PermissionPage from "@/components/page/permission-page";
import CreateSubjectDialog from "@/components/site/collection/subject/create-subject-dialog";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { getSubjectByClassId } from "@/services/data/subject-data";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassSettingSubjectsPage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
    
  const getClass = await getClassById(classId);
  if (!getClass) return <NotFoundPage />;
  if (user.role !== "ADMIN" && getClass.userId !== user.id) return <PermissionPage />


  const classSubject = await getSubjectByClassId(classId);
  return (
    <div className=" happy-page w-full">
      <div className=" flex justify-between w-full items-center">
        <h1 className=" happy-title-head">Class subjects</h1>
        <CreateSubjectDialog classId={classId} />
      </div>
      <div className=" space-y-2 mt-4">
        {classSubject && classSubject.length === 0 ? (
          <div>They is no subjects in this class</div>
        ) : (
          classSubject?.map((item) => {
            return <SubjectCardSmall subject={item} key={item.id} />;
          })
        )}
      </div>
    </div>
  );
};

export default ClassSettingSubjectsPage;
