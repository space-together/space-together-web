import { auth } from "@/auth";
import StaffDashboardPeople from "@/components/app/school-staff/dashboard/staff-dashboard-details";
import SchoolHeader from "@/components/app/school/school-header";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" p-4 space-y-4">
      <SchoolHeader onThePage lang={lang} />
      <StaffDashboardPeople lang={lang}/>
    </div>
  );
};

export default SchoolStaffPage;
