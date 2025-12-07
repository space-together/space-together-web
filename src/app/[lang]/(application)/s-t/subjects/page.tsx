import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import AllSubjectsCard from "@/components/page/school-staff/school-subjects/all-subjects-cards";
import ClassSubjectTable from "@/components/page/school-staff/school-subjects/class-subject-table";
import SchoolStaffSubjectFilter from "@/components/page/school-staff/school-subjects/school-staff-subjects-filter";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const SchoolSubjectsPage = async (props: PageProps<"/[lang]/s-t/subjects">) => {
  const params = await props.params;
  const { lang } = params;
  const [auth] = await Promise.all([authContext()]);

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const [subjectsRes] = await Promise.all([
    apiRequest<void, Paginated<ClassSubjectWithRelations>>(
      "get",
      `/school/class-subjects/others`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "class_subject",
      },
    ),
  ]);

  return (
    <RealtimeProvider<ClassSubjectWithRelations>
      channels={[
        {
          name: "class_subject",
          initialData: subjectsRes.data?.data ?? [],
        },
      ]}
    >
      <div className=" flex  flex-col space-y-2">
        <AppPageHeader
          total={subjectsRes?.data?.total}
          title="Subjects"
          description="Manage school subjects."
        />
        <SchoolStaffSubjectFilter auth={auth} />
        <DisplaySwitcher
          table={
            <ClassSubjectTable
              auth={auth}
              currentSubjects={subjectsRes.data?.data ?? []}
              lang={lang as Locale}
            />
          }
          cards={
            <AllSubjectsCard
              lang={lang as Locale}
              auth={auth}
              subjects={subjectsRes.data?.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};

export default SchoolSubjectsPage;
