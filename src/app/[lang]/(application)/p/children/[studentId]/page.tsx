import AccessDenied from "@/components/common/access-denied";
import MyAvatar from "@/components/common/image/my-avatar";
import NotFoundPage from "@/components/page/not-found";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Parent } from "@/lib/schema/parent/parent-schema";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import { authContext } from "@/lib/utils/auth-context";
import { calculateAge } from "@/lib/utils/format-date";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Child Details",
    description: "View your child's information",
  };
};

const ParentChildDetailPage = async (
  props: PageProps<"/[lang]/p/children/[studentId]">,
) => {
  const params = await props.params;
  const { lang, studentId } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  // Admin and staff can access any student
  const canBypass = ["ADMIN", "SCHOOLSTAFF"].includes(auth.user.role ?? "");

  // For parents, validate access
  if (auth.user.role === "PARENT" && !canBypass) {
    const parent_res = await apiRequest<void, Parent>(
      "get",
      "/parents/me",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    );

    if (!parent_res.data) {
      return <NotFoundPage message="Parent profile not found" />;
    }

    const parent = parent_res.data;

    // Check if student is in parent's children list
    if (!parent.student_ids.includes(studentId)) {
      return (
        <AccessDenied
          title="Access Denied"
          message="You don't have access to this student's information."
          backHref={`/${lang}/p/children`}
          backLabel="Back to My Children"
        />
      );
    }
  }

  // Fetch student data
  const student_res = await apiRequest<void, StudentWithRelations>(
    "get",
    `/school/students/${studentId}`,
    undefined,
    {
      token: auth.token,
      schoolToken: auth.schoolToken,
    },
  );

  if (!student_res.data) {
    return <NotFoundPage message="Student not found" />;
  }

  const student = student_res.data;
  const age = calculateAge(student.date_of_birth);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <MyAvatar
          src={student.image}
          alt={student.name}
          size="2xl"
        />
        <div>
          <h1 className="text-3xl font-bold">{student.name}</h1>
          <p className="text-muted-foreground">
            {student.class?.name || "No class assigned"}
          </p>
        </div>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="font-medium">{student.email || "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="font-medium">{student.phone || "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Gender</p>
              <p className="font-medium">
                {student.gender === "MALE"
                  ? "Male"
                  : student.gender === "FEMALE"
                    ? "Female"
                    : "-"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Age</p>
              <p className="font-medium">{age ? `${age} years` : "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Registration Number</p>
              <p className="font-medium">
                {student.registration_number || "-"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Admission Year</p>
              <p className="font-medium">{student.admission_year || "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Status</p>
              <Badge
                variant={student.status === "Active" ? "success" : "default"}
              >
                {student.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Class Info Card */}
      {student.class && (
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-muted-foreground text-sm">Class Name</p>
                <p className="font-medium">{student.class.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Class Code</p>
                <p className="font-medium">{student.class.code || "-"}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Grade Level</p>
                <p className="font-medium">{student.class.grade_level || "-"}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Capacity</p>
                <p className="font-medium">{student.class.capacity || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParentChildDetailPage;
