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

export const metadata: Metadata = {
  title: "Sectors - collection",
  description: "All sectors in database",
};

const SectorsPage = async (
  props: PageProps<"/[lang]/a/collections/sectors">,
) => {
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
    >
      <AppPageHeader
        total={request?.data?.total}
        title={"Sectors"}
        description=""
      />
      <SectorsTableCollection
        lang={lang as Locale}
        realtimeEnabled
        auth={auth}
      />
    </RealtimeProvider>
  );
};

export default SectorsPage;
