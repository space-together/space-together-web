"use client";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import TradeCard from "./trade-card";

interface props {
  lang: Locale;
  auth: AuthContext;
  trades: TradeModelWithOthers[];
  realtimeEnabled?: boolean;
}

const AllTradesCards = ({ lang, trades, realtimeEnabled = true }: props) => {
  const displayTrades = useRealtimeList<TradeModelWithOthers>(
    "trade",
    trades,
    realtimeEnabled,
  );

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayTrades.map((trade) => {
        return (
          <TradeCard
            key={trade._id || trade.username}
            trade={trade}
            lang={lang}
          />
        );
      })}
    </div>
  );
};

export default AllTradesCards;
