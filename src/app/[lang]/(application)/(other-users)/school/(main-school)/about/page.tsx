import { auth } from "@/auth";
import SchoolContacts from "@/components/app/school/school-contacts";
import SchoolHomeAbout from "@/components/app/school/school-home-about";
import SchoolImages from "@/components/app/school/school-images";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolAboutPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" min-h-screen px-4 space-x-4 flex ">
      <div className=" w-1/2 space-y-4">
        <SchoolHomeAbout isAboutSchool lang={lang} />
        <SchoolImages />
      </div>
      <div className=" w-1/2 space-y-4">
        <SchoolContacts />
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default SchoolAboutPage;
