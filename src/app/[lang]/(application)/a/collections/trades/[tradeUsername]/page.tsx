import TradeHeader from "@/app/[lang]/(application)/a/collections/trades/_components/trade-header";
import TradeMainClassesCard from "@/components/page/admin/trades/trade-main-classes-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import type {
  TradeModelWithOthers,
  TradeModule,
} from "@/lib/schema/admin/tradeSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(
  props: PageProps<"/[lang]/a/collections/trades/[tradeUsername]">,
): Promise<Metadata> {
  const { tradeUsername } = await props.params;
  return {
    title: `${tradeUsername} Trade | space-together`,
    description: `Details for trade ${tradeUsername}`,
  };
}

const TradeUsernamePage = async (
  props: PageProps<"/[lang]/a/collections/trades/[tradeUsername]">,
) => {
  const params = await props.params;
  const { tradeUsername, lang } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");
  const tradeRes = await apiRequest<void, TradeModelWithOthers>(
    "get",
    `/trades/others/match?field=username&value=${tradeUsername}`,
    undefined,
    { token: auth.token },
  );
  if (tradeRes.statusCode === 404)
    return <NotFoundPage message={tradeRes.message} />;
  if (!tradeRes.data)
    return <ErrorPage message={tradeRes.message} error={tradeRes.error} />;

  const [mainClassRes] = await Promise.all([
    apiRequest<void, Paginated<MainClassModel>>(
      "get",
      `/main-classes?field=trade_id&value=${tradeRes.data._id}`,
      undefined,
      { token: auth.token, realtime: "trade" },
    ),
  ]);

  return (
    <RealtimeProvider<TradeModule | MainClassModel>
      channels={[
        { name: "trade", initialData: [tradeRes.data] },
        { name: "main_class", initialData: mainClassRes?.data?.data ?? [] },
      ]}
      context="global"
      authToken={auth.token}
    >
      <main className="flex flex-col gap-4">
        <TradeHeader
          lang={lang as Locale}
          trade={tradeRes.data}
          auth={auth}
          main_classes={mainClassRes.data?.data ?? []}
        />
        <div className="w-full">
          <TradeMainClassesCard
            trade={tradeRes.data}
            mainClasses={mainClassRes.data?.data ?? []}
            auth={auth}
          />
        </div>
      </main>
    </RealtimeProvider>
  );
};

export default TradeUsernamePage;
