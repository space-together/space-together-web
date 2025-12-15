import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import SchoolStaffDashboard from "@/components/page/school-staff/dashboard/school-staff-dashboard-header";
import StaffDashboardPeople from "@/components/page/school-staff/dashboard/staff-dashboard-people";
import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const auth = await authContext();
  if (!auth?.school)
    return {
      title: "User not found",
      description: "It user not login",
    };
  return {
    title: auth.school?.name || "School not found",
  };
};

const SchoolStaffPage = async (props: PageProps<"/[lang]/s-t">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (auth.user.role !== "SCHOOLSTAFF") {
    return <PermissionPage lang={lang} role={auth.user.role} />;
  }

  const join_school_requestsRes = await apiRequest<
    void,
    JoinSchoolRequestWithRelations[]
  >("get", `/join-school-requests/my/pending`, undefined, {
    token: auth.token,
    schoolToken: auth.schoolToken,
  });

  if (!auth.school) {
    return (
      <RealtimeProvider<JoinSchoolRequestWithRelations>
        channels={[
          {
            name: "join_school_request",
            initialData: join_school_requestsRes.data ?? [],
          },
        ]}
      >
        <div className="grid h-full min-h-screen w-full place-content-center space-y-4 py-2">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex h-full w-full flex-row-reverse items-center justify-center gap-2">
              <MyLink
                loading
                href={`/${lang}/s-t/new`}
                button={{ library: "daisy", variant: "info" }}
                type="button"
              >
                <MyImage src="/icons/memo.png" role="ICON" />
                Register your school
              </MyLink>
              <JoinSchoolDialog />
            </div>
          </div>
          {join_school_requestsRes.data && (
            <JoinSchoolRequestBody
              lang={lang}
              auth={auth}
              requests={join_school_requestsRes.data}
            />
          )}
        </div>
      </RealtimeProvider>
    );
  }

  // page which shown base on user
  if (auth.school) {
    const [school] = await Promise.all([
      apiRequest<void, School>("get", `/schools/${auth.school.id}`, undefined, {
        token: auth.token,
        schoolToken: auth.schoolToken,
      }),
    ]);
    if (!school.data) return <NotFoundPage />;
    return (
      <div className="w-full space-y-4 ">
        <SchoolStaffDashboard
          lang={lang as Locale}
          auth={auth}
          school={school.data}
        />
        <div className=" flex gap-4 flex-row">
          <div className=" w-1/2">
            <StaffDashboardPeople auth={auth} lang={lang as Locale} />
          </div>
          <div className=" w-1/2">school educations</div>
        </div>
      </div>
    );
  }
};

export default SchoolStaffPage;
