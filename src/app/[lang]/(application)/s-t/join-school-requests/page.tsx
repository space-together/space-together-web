import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import JoinSchoolPage from "@/components/page/join-school-page";
import AllJoinSchoolRequestsCards from "@/components/page/school-staff/join-school-request/all-join-school-requests-cards";
import JoinSchoolRequestByCode from "@/components/page/school-staff/join-school-request/join-school-request-by-code";
import JoinSchoolRequestFilter from "@/components/page/school-staff/join-school-request/join-school-request-filter";
import SchoolJoinRequestsTable from "@/components/page/school-staff/table/school-join-request-table/join-school-request-table";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const auth = await authContext();
  if (!auth?.school)
    return {
      title: "School not found",
      description: "It school not login",
    };
  return {
    title: `Join school request of ${auth.school?.name}` || "School not found",
  };
};

interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}
const JoinSchoolRequestPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) return redirect(`/${lang}/auth/login`);
  if (!auth.school) return <JoinSchoolPage />;

  const [requests_res, classes_res] = await Promise.all([
    apiRequest<void, Paginated<JoinSchoolRequestWithRelations>>(
      "get",
      `/join-school-requests/others?field=school_id&value=${auth.school.id}&limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "join_school_request",
      },
    ),
    apiRequest<void, Paginated<Class>>("get", `/school/classes`, undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
      realtime: "class",
    }),
  ]);

  return (
    <RealtimeProvider<JoinSchoolRequestWithRelations | Class>
      channels={[
        {
          name: "join_school_request",
          initialData: requests_res.data?.data ?? [],
        },
        {
          name: "class",
          initialData: classes_res.data?.data ?? [],
        },
      ]}
      authToken={auth.token}
      schoolToken={auth.schoolToken}
      context="school"
    >
      <div className="max-w-full space-y-4">
        <AppPageHeader
          total={requests_res.data?.total}
          title="School Join Requests"
          description="Manage school join requests."
        />
        <JoinSchoolRequestByCode auth={auth} />
        <JoinSchoolRequestFilter
          auth={auth}
          requests={requests_res.data}
          classes={classes_res.data?.data ?? []}
          lang={lang}
        />
        <DisplaySwitcher
          table={
            <SchoolJoinRequestsTable
              auth={auth}
              requests={requests_res.data?.data ?? []}
              lang={lang}
              classes={classes_res.data?.data ?? []}
              realtimeEnabled
            />
          }
          cards={
            <AllJoinSchoolRequestsCards
              lang={lang}
              auth={auth}
              requests={requests_res.data?.data ?? []}
              realtimeEnabled
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};

export default JoinSchoolRequestPage;
