import AdminSchoolHero from "@/components/page/admin/school/admin-schoool-hero";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";
import SchoolInformation from "./_components/school-information";

const SchoolUsernamePage = async (
  props: PageProps<"/[lang]/a/collections/schools/[schoolUsername]">,
) => {
  const params = await props.params;
  const { lang, schoolUsername } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  const schoolRes = await apiRequest<void, School>(
    "get",
    `/schools/match?field=username&value=${schoolUsername}`,
    undefined,
    {
      token: auth.token,
      realtime: "school",
    },
  );

  if (!schoolRes.data)
    return <NotFoundPage message={`This ${schoolUsername} those not found`} />;

  return (
    <RealtimeProvider<School>
      channel="school"
      initialData={[schoolRes.data]}
      context="global"
      authToken={auth.token}
    >
      <AppPageHeader title="School over view" />
      <AdminSchoolHero
        auth={auth}
        lang={lang as Locale}
        school={schoolRes.data}
      />
      <Tabs className=" w-full flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="information" className="w-full">
          <SchoolInformation
            school={schoolRes.data}
            auth={auth}
            lang={lang as Locale}
          />
        </TabsContent>
        <TabsContent value="members" className=" w-full">
          School members
        </TabsContent>
      </Tabs>
    </RealtimeProvider>
  );
};

export default SchoolUsernamePage;
