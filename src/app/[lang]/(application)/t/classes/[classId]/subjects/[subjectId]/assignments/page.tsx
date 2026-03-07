import AssignmentCard from "@/components/assignments/assignment-card";
import AssignmentDialog from "@/components/assignments/assignment-dialog";
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
    title: "Assignments",
    description: "Manage class assignments",
  };
};

const TeacherClassSubjectAssignmentsPage = async (
  props: PageProps<"/[lang]/t/classes/[classId]/subjects/[subjectId]/assignments">
) => {
  const params = await props.params;
  const { lang, classId, subjectId } = params;
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
      `/assignments?field[]=class_id&value[]=${classId}&field[]=subject_id&value[]=${subjectId}&limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "assignment",
      }
    ),
  ]);

  return (
    <RealtimeProvider<Assignment>
      channels={[
        {
          name: "assignment",
          initialData: assignments_res?.data?.data ?? [],
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <AppPageHeader
            total={assignments_res.data?.total}
            title="Assignments"
            description="Manage assignments for this subject"
          />
          <AssignmentDialog
            auth={auth}
            classId={classId}
            subjectId={subjectId}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignments_res?.data?.data?.map((assignment) => (
            <AssignmentCard
              key={assignment.id || assignment._id}
              assignment={assignment}
              role="teacher"
              lang={lang as Locale}
            />
          ))}
        </div>

        {(!assignments_res?.data?.data || assignments_res.data.data.length === 0) && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No assignments yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first assignment to get started
            </p>
          </div>
        )}
      </div>
    </RealtimeProvider>
  );
};

export default TeacherClassSubjectAssignmentsPage;
