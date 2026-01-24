import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";
import AllSchoolStaffCards from "./_component/all-school-staff-cards";
import SchoolStaffFilter from "./_component/school-staff-filter";
import SchoolStaffTable from "./_component/school-staff-table";

const SchoolStaffs = async (props: PageProps<"/[lang]/s-t/staffs">) => {
  const prams = await props.params;
  const { lang } = prams;
  const auth = await authContext();

  if (!auth) redirect(`/${lang}/auth/login`);

  if (!auth.school)
    return <NotFoundPage message="You need to have school to view this page" />;

  const schoolStaffsRes = await apiRequest<void, Paginated<SchoolStaff>>(
    "get",
    `/school/school-staff?limit=${LIMIT}`,
    undefined,
    {
      token: auth.token,
      schoolToken: auth.schoolToken,
      realtime: "school_staff",
    },
  );
  return (
    <RealtimeProvider<SchoolStaff>
      channels={[
        {
          name: "student",
          initialData: schoolStaffsRes?.data?.data ?? [],
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="space-y-4 ">
        <AppPageHeader
          total={schoolStaffsRes.data?.total}
          title="School Staff"
          description="Manage school staff."
        />
        <SchoolStaffFilter auth={auth} staffs={schoolStaffsRes.data} />
        <DisplaySwitcher
          page="school-staff"
          table={
            <SchoolStaffTable
              auth={auth}
              lang={lang as Locale}
              schoolStaffs={schoolStaffsRes?.data?.data ?? []}
              realtimeEnabled
            />
          }
          cards={
            <AllSchoolStaffCards
              lang={lang as Locale}
              auth={auth}
              data={schoolStaffsRes?.data?.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};

export default SchoolStaffs;
