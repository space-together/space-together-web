import SectorHeader from "@/components/page/admin/sector/sector-header";
import SectorTradesCard from "@/components/page/admin/sector/sector-trades-card";
import AppPageHeader from "@/components/page/common/app-page-header";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sectorUsername: string }>;
}): Promise<Metadata> {
  const { sectorUsername } = await params;
  return {
    title: `${sectorUsername} Sector | space-together`,
    description: `Details for Sector ${sectorUsername}`,
  };
}

const SectorUsernamePage = async (
  props: PageProps<"/[lang]/a/collections/sectors/[sectorUsername]">,
) => {
  const params = await props.params;
  const { sectorUsername, lang } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  const sectorRes = await apiRequest<void, SectorModel>(
    "get",
    `/sectors/username/${sectorUsername}`,
    undefined,
    { token: auth.token, realtime: "sector" },
  );
  if (sectorRes.statusCode === 404)
    return <NotFoundPage message={sectorRes.message} />;
  if (!sectorRes.data)
    return <ErrorPage message={sectorRes.message} error={sectorRes.error} />;

  const [tradesRes] = await Promise.all([
    apiRequest<void, TradeModule[]>(
      "get",
      `/trades/sector/${sectorRes.data._id || sectorRes.data.id}`,
      undefined,
      { token: auth.token, realtime: "trade" },
    ),
  ]);

  if (!tradesRes.data)
    return <ErrorPage message={tradesRes.message} error={tradesRes.error} />;

  return (
    <RealtimeProvider<SectorModel | TradeModule>
      channels={[
        { name: "sector", initialData: [sectorRes.data] },
        { name: "trade", initialData: tradesRes.data },
      ]}
    >
      <main className="flex flex-col gap-4 ">
        <AppPageHeader title="Sector" description="" />
        <SectorHeader
          sector={sectorRes.data}
          auth={auth}
          lang={lang as Locale}
        />
        <Separator />
        <main className="w-full flex flex-row gap-4">
          <SectorTradesCard
            sector={sectorRes.data}
            trades={tradesRes.data}
            auth={auth}
          />
          <div className=" lg:w-1/3">
            <div>
              <h4 className=" h5">Education year</h4>
              {/*add year education*/}
            </div>
            <div>Bruno</div>
          </div>
        </main>
      </main>
    </RealtimeProvider>
  );
};

export default SectorUsernamePage;
