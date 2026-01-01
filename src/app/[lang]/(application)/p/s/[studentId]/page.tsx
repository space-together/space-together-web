import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import StudentProfileHeader from "@/components/profile/student/student-profile-header";
import type { Locale } from "@/i18n";
import type { Student } from "@/lib/schema/student/student-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const SchoolStudentPage = async (
  props: PageProps<"/[lang]/p/s/[studentId]">,
) => {
  const params = await props.params;
  const { studentId, lang } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const [studentRes] = await Promise.all([
    apiRequest<void, Student>(
      "get",
      `/school/students/${studentId}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  if (!studentRes.data) {
    return <NotFoundPage message={"Student not found"} />;
  }

  return (
    <div className=" flex flex-col gap-4">
      <AppPageHeader title="Student Profile" />
      <StudentProfileHeader student={studentRes.data} lang={lang as Locale} />
    </div>
  );
};

export default SchoolStudentPage;
