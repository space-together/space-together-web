import { auth } from "@/auth";
import ClassNotFound from "@/components/app/class/class-not-found";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassSettingPage = async (props: props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  const getClass = await getClassById(classId);
  if (!getClass) return <ClassNotFound />;
  if (user.role === "ADMIN")
    return redirect(`/${lang}/class/${classId}`);
  return <div>class setting page</div>;
};

export default ClassSettingPage;
