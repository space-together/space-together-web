import ResultsPortal from "@/components/page/student/results-portal";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

export default async function StudentResultsPage() {
  const auth = await authContext();

  if (!auth || auth.role !== "Student") {
    redirect("/auth/login");
  }

  // In real app, get student ID from auth context
  const studentId = auth.userId || "";

  return (
    <div className="container mx-auto p-6">
      <ResultsPortal studentId={studentId} auth={auth} />
    </div>
  );
}
