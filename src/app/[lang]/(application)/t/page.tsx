import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import type { School } from "@/lib/schema/school/school-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TeacherDashboardTimetable from "./_components/teacher-dashboard-timetable";
import TeacherHeroDashboard from "./_components/teacher-hero";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
};

const TeacherPage = async (props: PageProps<"/[lang]/t">) => {
  const params = await props.params;
  const { lang } = params;

  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (auth.user.role !== "TEACHER") {
    return <PermissionPage lang={lang as Locale} role={auth.user.role} />;
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
              lang={lang as Locale}
              auth={auth}
              requests={join_school_requestsRes.data}
            />
          )}
        </div>
      </RealtimeProvider>
    );
  }

  // Teacher Dashboard
  const [school, teacher] = await Promise.all([
    apiRequest<void, School>("get", `/schools/${auth.school.id}`, undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),
    apiRequest<void, Teacher>(
      "get",
      `/schools/teachers/match?field=user_id&value=${auth.user.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  if (!school.data) return <NotFoundPage />;

  return (
    <div className="w-full space-y-4">
      <TeacherHeroDashboard
        teacher={teacher?.data}
        school={school.data}
        lang={lang as Locale}
        auth={auth}
      />
      <div className="space-y-4">
        <TeacherDashboardTimetable />
      </div>
    </div>
  );
};

export default TeacherPage;
