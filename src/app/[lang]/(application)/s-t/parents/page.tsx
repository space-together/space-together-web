import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import AllParentsCards from "@/components/page/school-staff/parents-components/all-parents-card";
import ParentFilter from "@/components/page/school-staff/parents-components/parents-filter";
import SchoolParentTable from "@/components/page/school-staff/table/parent-table/table-parent-list";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Parent Management",
    description: "Manage school parents and their connections to students",
  };
};

const SchoolStaffParentPage = async (
  props: PageProps<"/[lang]/s-t/parents">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  if (!auth.school)
    return <NotFoundPage message="You need to have school to view this page" />;

  const [parents_res] = await Promise.all([
    apiRequest<void, Paginated<ParentWithRelations>>(
      "get",
      `/school/parents?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "parent",
      },
    ),
  ]);

  return (
    <RealtimeProvider<ParentWithRelations>
      channels={[
        {
          name: "parent",
          initialData: parents_res?.data?.data ?? [],
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="space-y-4 ">
        <AppPageHeader
          total={parents_res.data?.total}
          title="Parents"
          description="Manage school parents and connect them to students."
        />
        <ParentFilter auth={auth} parents={parents_res.data} />
        <DisplaySwitcher
          table={
            <SchoolParentTable
              auth={auth}
              lang={lang as Locale}
              parents={parents_res?.data?.data ?? []}
              realtimeEnabled
            />
          }
          cards={
            <AllParentsCards
              lang={lang as Locale}
              auth={auth}
              parents={parents_res?.data?.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffParentPage;
