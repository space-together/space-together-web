import AllMainClassesCards from "@/app/[lang]/(application)/a/collections/main_classes/_components/all-main-classes-cards";
import MainClassesFilter from "@/app/[lang]/(application)/a/collections/main_classes/_components/main-classes-filter";
import DisplaySwitcher from "@/components/display/display-switcher";
import MainClassesTableCollection from "@/components/page/admin/main-class/main-class-table-collection";
import AppPageHeader from "@/components/page/common/app-page-header";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "main classes collection | space-together",
  description: "All main classes in database",
};

const MainClassesPage = async (
  props: PageProps<"/[lang]/a/collections/main_classes">,
) => {
  const auth = await authContext();
  const params = await props.params;
  const { lang } = params;

  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, Paginated<MainClassModelWithOthers>>(
    "get",
    `/main-classes/others?limit=${LIMIT}`,
    undefined,
    { token: auth.token, realtime: "main_class" },
  );

  return (
    <RealtimeProvider<MainClassModelWithOthers>
      channel="main_class"
      initialData={request.data?.data ?? []}
    >
      <AppPageHeader
        total={request?.data?.total}
        title={"Main classes"}
        description=""
      />
      <MainClassesFilter auth={auth} lang={lang as Locale} cls={request.data} />{" "}
      <DisplaySwitcher
        table={
          <MainClassesTableCollection
            initialClasses={request.data?.data ?? []}
            realtimeEnabled
            auth={auth}
          />
        }
        cards={<AllMainClassesCards classes={request.data?.data ?? []} lang={lang as Locale} auth={auth} />}
      />
    </RealtimeProvider>
  );
};

export default MainClassesPage;
