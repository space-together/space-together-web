import ChildPerformance from "@/components/page/parent/child-performance";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    studentId: string;
  }>;
}

export default async function ChildPerformancePage({ params }: PageProps) {
  const auth = await authContext();
  const { studentId } = await params;

  if (!auth || auth.user.role !== "PARENT") {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto p-6">
      <ChildPerformance studentId={studentId} auth={auth} />
    </div>
  );
}
