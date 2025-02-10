import { auth } from "@/auth";
import SubjectCardSmall from "@/components/cards/subject-card-small";
import CreateSubjectDialog from "@/components/site/collection/subject/create-subject-dialog";
import { Locale } from "@/i18n";
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
  const classSubject = await getSubjectByClassId(classId);
  return (
    <div>
      <CreateSubjectDialog classId={classId} />
      <div className=" space-y-2 mt-4">
        {classSubject &&
          classSubject.map((item) => {
            return <SubjectCardSmall subject={item} key={item.id} />;
          })}
      </div>
    </div>
  );
};

export default ClassSettingSubjectsPage;
