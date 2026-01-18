import DisplaySwitcher from "@/components/display/display-switcher";
import AllSchoolsCards from "@/components/page/admin/school/all-schools-cards";
import SchoolsFilter from "@/components/page/admin/school/school-filter";
import AppPageHeader from "@/components/page/common/app-page-header";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const SchoolsPage = async (
  props: PageProps<"/[lang]/a/collections/schools">,
) => {
  const params = await props.params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  const schoolsRes = await apiRequest<void, Paginated<School>>(
    "get",
    `/schools?limit=${LIMIT}`,
    undefined,
    {
      token: auth.token,
      realtime: "school",
    },
  );
  return (
    <RealtimeProvider<School>
      channels={[
        {
          name: "student",
          initialData: schoolsRes?.data?.data ?? [],
        },
      ]}
      context="global"
      authToken={auth.token}
    >
      <div>
        <AppPageHeader
          total={schoolsRes.data?.total}
          title={"Schools"}
          description=""
        />
        <SchoolsFilter
          schools={schoolsRes.data}
          lang={params.lang as Locale}
          auth={auth}
        />
        <DisplaySwitcher
          table={<div>school table</div>}
          cards={
            <AllSchoolsCards
              auth={auth}
              lang={params.lang as Locale}
              schools={schoolsRes.data?.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};

export default SchoolsPage;
