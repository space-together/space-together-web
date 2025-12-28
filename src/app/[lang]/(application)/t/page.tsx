import { DataDetailsCardListSkeleton } from "@/components/common/skeletons/data-details-card-skeleton";
import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import TeacherDashboardContent from "@/components/page/teacher/dashboard/teacher-dashboard-content";
import TeacherDashboardHeader from "@/components/page/teacher/dashboard/teacher-dashboard-header";
import { Card } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
};

interface Props {
  params: Promise<{ lang: Locale }>;
}

const TeacherPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;

  const auth = await authContext();


  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }


  if (auth.user.role !== "TEACHER") {
    return <PermissionPage lang={lang} role={auth.user.role} />;
  }

  if (!auth.school) {
    const join_school_requestsRes = await apiRequest<
      void,
      JoinSchoolRequestWithRelations[]
    >("get", `/join-school-requests/my/pending`, undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    });

    return (
      <RealtimeProvider<JoinSchoolRequestWithRelations>
        channels={[
          {
            name: "join_school_request",
            initialData: join_school_requestsRes.data ?? [],
          },
        ]}
      >
        <div className="grid h-full min-h-screen w-full place-content-center space-y-4 px-4 py-2">
          <JoinSchoolDialog />

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

  // Teacher Dashboard
  const school = await apiRequest<void, School>(
    "get",
    `/schools/${auth.school.id}`,
    undefined,
    {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }
  );

  if (!school.data) return <NotFoundPage />;

  return (
    <div className="w-full space-y-4">
      <Card className=" p-6">
        <TeacherDashboardHeader
        lang={lang}
        auth={auth}
        school={school.data}
      />
      </Card>
      <div>
        <TeacherDashboardContent auth={auth} lang={lang as Locale} />
      </div>
      
    </div>
  );
};

export default TeacherPage;
