import { auth } from "@/auth";
import CreateSubjectDialog from "@/components/site/collection/subject/create-subject-dialog";
import { Locale } from "@/i18n";
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

  return (
    <div>
      <CreateSubjectDialog classId={classId}/>
      class setting subject page
    </div>
  );
};

export default ClassSettingSubjectsPage;
