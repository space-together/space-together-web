"use client";

import MyLink from "@/components/common/myLink";
import NoItemsPage from "@/components/common/pages/no-items-page";
import CreateTradeDialog from "@/components/page/admin/trades/createTradeDialog";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import { Calendar, Clock, GraduationCap } from "lucide-react";

interface Props {
  sector: SectorModel;
  auth: AuthContext;
  trades: TradeModule[];
}

const SectorTradesCard = ({ sector, auth, trades }: Props) => {
  const displayTrades = useRealtimeList<TradeModule>("trade", trades, true);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="h5">Trades in {sector.name}</h4>
        <CreateTradeDialog sector={sector} auth={auth} />
      </div>
      <div>
        {displayTrades.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <NoItemsPage
              title="No trades found 😥"
              details="Add a new trade to this sector"
            />
            <CreateTradeDialog sector={sector} auth={auth} />
          </div>
        ) : (
          <div className=" grid grid-cols-1 gap-3">
            {displayTrades.map((trade, i) => {
              const isDisabled = trade.disable === true;

              return (
                <Item
                  key={`${trade._id}-${i}`}
                  variant="base"
                  className="transition-all hover:shadow-sm"
                >
                  <ItemContent className="flex flex-col gap-2">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <ItemTitle className=" gap-2 flex items-center">
                        <MyLink
                          href={`/a/collections/trades/${trade.username}`}
                          className="text-lg font-semibold"
                        >
                          {trade.name}
                        </MyLink>

                        <MyLink
                          href={`/a/collections/trades/${trade.username}`}
                          className="text-muted-foreground text-sm"
                        >
                          @{trade.username}
                        </MyLink>
                      </ItemTitle>
                      <Badge variant={isDisabled ? "secondary" : "default"}>
                        {isDisabled ? "Disabled" : "Active"}
                      </Badge>
                    </div>

                    {trade.description && (
                      <MyLink href={`/a/collections/trades/${trade.username}`}>
                        <ItemDescription className="text-muted-foreground text-sm line-clamp-none">
                          {trade.description}
                        </ItemDescription>
                      </MyLink>
                    )}

                    {/* Details */}
                    <div className="text-muted-foreground mt-2 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>
                          Class: {trade.class_min} - {trade.class_max}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Created:{" "}
                          {trade.created_at
                            ? formatReadableDate(trade.created_at)
                            : "—"}
                        </span>
                      </div>
                      {trade.updated_at && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            Updated: {formatReadableDate(trade.updated_at)}
                          </span>
                        </div>
                      )}
                    </div>
                  </ItemContent>
                </Item>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorTradesCard;
