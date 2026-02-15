import AcademicsManagement from "@/components/page/admin/academics/academics-management";
import { Skeleton } from "@/components/ui/skeleton";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AcademicsPage() {
  const auth = await authContext();
  
  if (!auth) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Academic Management</h1>
          <p className="text-muted-foreground">
            Manage exams, assessments, grading scales, and academic records
          </p>
        </div>
      </div>

      <Suspense fallback={<AcademicsLoadingSkeleton />}>
        <AcademicsManagement auth={auth} />
      </Suspense>
    </div>
  );
}

function AcademicsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
