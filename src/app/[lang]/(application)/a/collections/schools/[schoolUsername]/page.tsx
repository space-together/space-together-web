import AdminSchoolHero from "@/components/page/admin/school/admin-schoool-hero";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const SchoolUsernamePage = async (
  props: PageProps<"/[lang]/a/collections/schools/[schoolUsername]">,
) => {
  const params = await props.params;
  const { lang, schoolUsername } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  const schoolRes = await apiRequest<void, School>(
    "get",
    `/schools/username/${schoolUsername}`,
    undefined,
    {
      token: auth.token,
      realtime: "school",
    },
  );

  if (!schoolRes.data)
    return <NotFoundPage message={`This ${schoolUsername} those not found`} />;

  return (
    <RealtimeProvider<School> channel="school" initialData={[schoolRes.data]}>
      <AppPageHeader title="School over view" />
      <AdminSchoolHero
        auth={auth}
        lang={lang as Locale}
        school={schoolRes.data}
      />
    </RealtimeProvider>
  );
};

export default SchoolUsernamePage;
