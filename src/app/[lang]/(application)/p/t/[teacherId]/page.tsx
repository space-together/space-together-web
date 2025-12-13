import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import TeacherProfileHeader from "@/components/profile/teacher/teacher-profile-header";
import TeacherSubjectTable from "@/components/profile/teacher/teacher-subjects-table";
import TestCalendar from "@/components/test/test-calendar";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const TeacherProfilePage = async (
  props: PageProps<"/[lang]/p/t/[teacherId]">,
) => {
  const params = await props.params;
  const { teacherId, lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const [teacherRes, subsRes] = await Promise.all([
    apiRequest<void, Teacher>(
      "get",
      `/school/teachers/${teacherId}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    apiRequest<void, Paginated<ClassSubjectWithRelations>>(
      "get",
      `/school/class-subjects/others?&field=teacher_id&value=${teacherId}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  if (!teacherRes.data) {
    return <NotFoundPage message={"Teacher not found"} />;
  }

  return (
    <div className=" flex flex-col gap-4">
      <AppPageHeader title="Teacher Profile" />
      <TeacherProfileHeader teacher={teacherRes.data} lang={lang as Locale} />
      <Separator />
      <div className=" flex flex-row gap-4">
        <TeacherSubjectTable
          auth={auth}
          lang={lang as Locale}
          subs={subsRes.data?.data ?? []}
        />
        <div>Class work</div>
      </div>
      <TestCalendar />
    </div>
  );
};

export default TeacherProfilePage;
