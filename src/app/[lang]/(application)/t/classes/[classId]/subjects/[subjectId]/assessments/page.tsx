import ScoreEntryInterface from "@/components/page/teacher/score-entry-interface";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    classId: string;
    subjectId: string;
  }>;
}

export default async function AssessmentsPage({ params }: PageProps) {
  const auth = await authContext();
  const { classId, subjectId } = await params;

  if (!auth || auth.user.role !== "TEACHER") {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto p-6">
      <ScoreEntryInterface
        classId={classId}
        subjectId={subjectId}
        auth={auth}
      />
    </div>
  );
}
