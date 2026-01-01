import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import AllStudentsCards from "@/components/page/school-staff/students-components/all-students-card";
import StudentFilter from "@/components/page/school-staff/students-components/students-fiter";
import SchoolStudentTable from "@/components/page/school-staff/table/student-table/table-student-list";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Student Management",
    description: "Manage your classes and their roles",
  };
};

const SchoolStaffStudentPage = async (
  props: PageProps<"/[lang]/s-t/students">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  if (!auth.school)
    return <NotFoundPage message="You need to have school to view this page" />;

  const [students_res] = await Promise.all([
    apiRequest<void, Paginated<StudentWithRelations>>(
      "get",
      `/school/students/others?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "student",
      },
    ),
  ]);

  return (
    <RealtimeProvider<StudentWithRelations>
      channels={[
        {
          name: "student",
          initialData: students_res?.data?.data ?? [],
        },
      ]}
    >
      <div className="space-y-4 ">
        <AppPageHeader
          total={students_res.data?.total}
          title="Students"
          description="Manage school students."
        />
        <StudentFilter auth={auth} />
        <DisplaySwitcher
          table={
            <SchoolStudentTable
              auth={auth}
              lang={lang as Locale}
              students={students_res?.data?.data ?? []}
              realtimeEnabled
            />
          }
          cards={
            <AllStudentsCards
              lang={lang as Locale}
              auth={auth}
              students={students_res?.data?.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffStudentPage;
