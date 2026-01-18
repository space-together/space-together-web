import AllSectorsCards from "@/app/[lang]/(application)/a/collections/sectors/_components/all-sectors-cards";
import DisplaySwitcher from "@/components/display/display-switcher";
import SectorsTableCollection from "@/components/page/admin/sector/sectors-table-collection";
import AppPageHeader from "@/components/page/common/app-page-header";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SectorsFilter from "./_components/sectors_filter";

export const metadata: Metadata = {
  title: "Sectors - collection",
  description: "All sectors in database",
};

const SectorsPage = async (
  props: PageProps<"/[lang]/a/collections/sectors">,
) => {
  const params = await props.params;
  const auth = await authContext();
  const { lang } = await props.params;
  if (!auth) redirect("/auth/login");

  const request = await apiRequest<void, Paginated<SectorModel>>(
    "get",
    "/sectors",
    undefined,
    { token: auth.token, realtime: "sector" },
  );
  return (
    <RealtimeProvider<SectorModel>
      channel="sector"
      initialData={request?.data?.data ?? []}
      context="global"
      authToken={auth.token}
    >
      <AppPageHeader
        total={request?.data?.total}
        title={"Sectors"}
        description=""
      />
      <SectorsFilter
        sectors={request.data}
        lang={params.lang as Locale}
        auth={auth}
      />
      <DisplaySwitcher
        table={
          <SectorsTableCollection
            sectors={request.data?.data ?? []}
            lang={lang as Locale}
            realtimeEnabled
            auth={auth}
          />
        }
        cards={
          <AllSectorsCards
            lang={lang as Locale}
            auth={auth}
            sectors={request.data?.data ?? []}
          />
        }
      />
    </RealtimeProvider>
  );
};

export default SectorsPage;
