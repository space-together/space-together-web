import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import PermissionPage from "@/components/page/permission-page";
import AllClassesCards from "@/components/page/school-staff/class-components/all-classes-card";
import SchoolStaffClassFilter from "@/components/page/school-staff/school-classes/school-staff-class-filter";
import ClassesSchoolTable from "@/components/page/school-staff/table/class-table/classes-table";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Class Management",
  description: "Manage your class members and their roles",
  keywords: "class, management, students, teachers",
};

const SchoolStaffClassesPage = async (
  props: PageProps<"/[lang]/s-t/classes">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school)
    return (
      <PermissionPage
        lang={lang as Locale}
        role={auth.user.role ?? "STUDENT"}
      />
    );

  const [classes] = await Promise.all([
    apiRequest<void, Paginated<ClassWithOthers>>(
      "get",
      `/school/classes/others?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "class",
      },
    ),
  ]);

  return (
    <RealtimeProvider<ClassWithOthers>
      channels={[
        {
          name: "class",
          initialData: classes.data?.data ?? [],
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="max-w-full space-y-4">
        <AppPageHeader
          total={classes.data?.total}
          title="Classes"
          description="Manage and view all classes in your school."
        />
        <SchoolStaffClassFilter classes={classes.data} auth={auth} />
        <DisplaySwitcher
          table={
            <ClassesSchoolTable
              lang={lang as Locale}
              realtimeEnabled
              auth={auth}
              classes={classes.data?.data ?? []}
            />
          }
          cards={
            <AllClassesCards
              classes={classes.data?.data ?? []}
              lang={lang as Locale}
              realtimeEnabled
              auth={auth}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffClassesPage;
