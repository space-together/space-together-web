import AppPageHeader from "@/components/page/common/app-page-header";
import SchoolCurriculumSettingCard from "@/components/page/school-staff/school-setting/education/school-curriculum-setting-card";
import { Separator } from "@/components/ui/separator";
import { authContext } from "@/lib/utils/auth-context";
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

  return (
    <div className="flex flex-col gap-2">
      <AppPageHeader title="School Education Settings" />
      <Separator />
      <SchoolCurriculumSettingCard auth={auth} />
    </div>
  );
};

export default SchoolSettingEducationSettingsPage;
