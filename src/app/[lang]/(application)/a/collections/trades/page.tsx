import TradesFilter from "@/app/[lang]/(application)/a/collections/trades/_components/trades_filter";
import DisplaySwitcher from "@/components/display/display-switcher";
import TradesTableCollection from "@/components/page/admin/trades/trade-trable-collection";
import AppPageHeader from "@/components/page/common/app-page-header";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AllTradesCards from "./_components/all-trades-cards";

export const metadata: Metadata = {
  title: "Trades collection | space-together",
  description: "All trades in database",
};

const TradesPage = async (props: PageProps<"/[lang]/a/collections/trades">) => {
  const auth = await authContext();
  const params = await props.params;
  const { lang } = params;

  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, Paginated<TradeModelWithOthers>>(
    "get",
    `/trades/others?limit=${LIMIT}`,
    undefined,
    { token: auth.token, realtime: "trade" },
  );

  return (
    <RealtimeProvider<TradeModelWithOthers>
      channel="trade"
      initialData={request?.data?.data ?? []}
    >
      <AppPageHeader
        total={request?.data?.total}
        title={"Trades"}
        description=""
      />

      <TradesFilter auth={auth} lang={lang as Locale} trades={request.data} />
      <DisplaySwitcher
        table={
          <TradesTableCollection
            realtimeEnabled
            initialTrades={request?.data?.data ?? []}
            auth={auth}
          />
        }
        cards={
          <AllTradesCards
            lang={lang as Locale}
            realtimeEnabled
            trades={request?.data?.data ?? []}
            auth={auth}
          />
        }
      />
    </RealtimeProvider>
  );
};

export default TradesPage;
