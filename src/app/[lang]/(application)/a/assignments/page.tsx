import AssignmentCard from "@/components/assignments/assignment-card";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: "System Assignments",
    description: "System-wide assignment management",
  };
};

const AdminAssignmentsPage = async (
  props: PageProps<"/[lang]/a/assignments">
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (auth.user.role !== "ADMIN") {
    return <NotFoundPage message="Admin access required" />;
  }

  const [assignments_res, count_res] = await Promise.all([
    apiRequest<void, Paginated<Assignment>>(
      "get",
      `/assignments?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        realtime: "assignment",
      }
    ),
    apiRequest<void, { count: number }>(
      "get",
      "/assignments/count",
      undefined,
      {
        token: auth.token,
      }
    ),
  ]);

  const assignments = assignments_res?.data?.data ?? [];
  const totalCount = count_res?.data?.count ?? 0;

  // Calculate statistics
  const publishedCount = assignments.filter((a) => a.status === "Published").length;
  const draftCount = assignments.filter((a) => a.status === "Draft").length;
  const archivedCount = assignments.filter((a) => a.status === "Archived").length;

  // Calculate submission statistics
  const totalSubmissions = assignments.reduce(
    (sum, a) => sum + ((a as any).submission_count || 0),
    0
  );
  const totalStudents = assignments.reduce(
    (sum, a) => sum + ((a as any).total_students || 0),
    0
  );
  const submissionRate =
    totalStudents > 0
      ? Math.round((totalSubmissions / totalStudents) * 100)
      : 0;

  return (
    <RealtimeProvider<Assignment>
      channels={[
        {
          name: "assignment",
          initialData: assignments,
        },
      ]}
      context="global"
      authToken={auth.token}
    >
      <div className="space-y-6">
        <AppPageHeader
          total={totalCount}
          title="System Assignments"
          description="System-wide assignment overview and management"
        />

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Draft
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-600">{draftCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Archived
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{archivedCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Submission Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{submissionRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Assignments</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id || assignment._id}
                assignment={assignment}
                role="staff"
                lang={lang as Locale}
              />
            ))}
          </div>
        </div>

        {assignments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No assignments in the system</p>
            <p className="text-sm text-muted-foreground">
              Assignments will appear here once created
            </p>
          </div>
        )}
      </div>
    </RealtimeProvider>
  );
};

export default AdminAssignmentsPage;
