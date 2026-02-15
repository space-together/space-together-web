import AssignmentCard from "@/components/assignments/assignment-card";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Assignment } from "@/lib/schema/assignment/assignment-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "My Assignments",
    description: "View and submit your assignments",
  };
};

const StudentAssignmentsPage = async (
  props: PageProps<"/[lang]/s/assignments">
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return <NotFoundPage message="You need to have school to view this page" />;
  }

  const [assignments_res] = await Promise.all([
    apiRequest<void, Paginated<Assignment>>(
      "get",
      `/assignments?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "assignment",
      }
    ),
  ]);

  const assignments = assignments_res?.data?.data ?? [];
  
  // Separate upcoming and past assignments
  const now = new Date();
  const upcomingAssignments = assignments.filter(
    (a) => new Date(a.due_date) >= now
  );
  const pastAssignments = assignments.filter(
    (a) => new Date(a.due_date) < now
  );

  return (
    <RealtimeProvider<Assignment>
      channels={[
        {
          name: "assignment",
          initialData: assignments,
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="space-y-6">
        <AppPageHeader
          total={assignments_res.data?.total}
          title="My Assignments"
          description="View and submit your assignments"
        />

        {/* Upcoming Assignments */}
        {upcomingAssignments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upcoming</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id || assignment._id}
                  assignment={assignment}
                  role="student"
                  lang={lang as Locale}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Assignments */}
        {pastAssignments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Past Due</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id || assignment._id}
                  assignment={assignment}
                  role="student"
                  lang={lang as Locale}
                />
              ))}
            </div>
          </div>
        )}

        {assignments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No assignments yet</p>
            <p className="text-sm text-muted-foreground">
              Your assignments will appear here
            </p>
          </div>
        )}
      </div>
    </RealtimeProvider>
  );
};

export default StudentAssignmentsPage;
