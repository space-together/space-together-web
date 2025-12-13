import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import SchoolCurriculumSettingCard from "@/components/page/school-staff/school-setting/education/school-curriculum-setting-card";
import { Separator } from "@/components/ui/separator";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const SchoolSettingEducationSettingsPage = async (
  props: PageProps<"/[lang]/s-t/settings/education">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!auth.school)
    return (
      <NotFoundPage message="You need to have school to access this page" />
    );

  const [schoolRes] = await Promise.all([
    apiRequest<void, School>("get", `/schools/${auth?.school?.id}`, undefined, {
      token: auth.token,
    }),
  ]);

  if (!schoolRes.data)
    return <NotFoundPage message=" It looks like the school was not found." />;

  return (
    <div className="flex flex-col gap-2">
      <AppPageHeader title="School Education Settings" />
      <Separator />
      <SchoolCurriculumSettingCard school={schoolRes.data} auth={auth} />
    </div>
  );
};

export default SchoolSettingEducationSettingsPage;
