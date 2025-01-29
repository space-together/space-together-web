import { auth } from "@/auth";
import SchoolHeader from "@/components/app/school/school-header";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolIdPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className=" px-4">
      <SchoolHeader />
      <div className=" h-screen" />
    </div>
  );
};

export default SchoolIdPage;
