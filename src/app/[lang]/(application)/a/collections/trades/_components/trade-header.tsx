"use client";

import TradeDialog from "@/app/[lang]/(application)/a/collections/trades/_components/trade-dialog";
import MyAvatar from "@/components/common/image/my-avatar";
import { OpenImages } from "@/components/common/image/open-images";
import MyLink from "@/components/common/myLink";
import DeleteTradeDialog from "@/components/page/admin/trades/deleteTradeDialog";
import TradeDisableDialog from "@/components/page/admin/trades/trade-disable-dialog";
import type { Locale } from "@/i18n";
import { useRealtimeItem } from "@/lib/hooks/use-realtime-list";
import type { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import type { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";

interface TradeHeaderProps {
  trade: TradeModelWithOthers;
  auth: AuthContext;
  main_classes?: MainClassModel[];
  lang: Locale;
}

const TradeHeader = ({ trade, auth, main_classes, lang }: TradeHeaderProps) => {
  const currentTrade = useRealtimeItem<TradeModelWithOthers>("trade", trade);

  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      {/* Logo (from sector) */}
      {currentTrade.sector?.logo && (
        <OpenImages
          images={[currentTrade.sector.logo]}
          component={
            <MyAvatar
              classname="object-contain"
              size="2xl"
              src={currentTrade.sector.logo}
              alt={currentTrade.name}
              type="square"
              className="rounded-none"
            />
          }
        />
      )}

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Title & actions */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="h4">{currentTrade.name}</h4>

            {currentTrade.username && (
              <p className="text-xl font-normal opacity-80">
                @{currentTrade.username}
              </p>
            )}

            <div className="flex gap-4 ml-4">
              <TradeDialog trade={currentTrade} auth={auth} />
              <TradeDisableDialog trade={currentTrade} auth={auth} />
              <DeleteTradeDialog trade={currentTrade} auth={auth} />
            </div>
          </div>

          {currentTrade.description && (
            <p className="text-sm">{currentTrade.description}</p>
          )}
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          {currentTrade.type && (
            <div className="flex gap-2 items-center">
              <span>Type:</span>
              <p className="capitalize font-medium">{currentTrade.type}</p>
            </div>
          )}

          <div className="flex gap-2">
            <span>Class range:</span>
            <p className="font-medium">
              {currentTrade.class_min} – {currentTrade.class_max}
            </p>
          </div>

          <div className="flex gap-2">
            <span>Classes:</span>
            <p className="font-medium">{main_classes?.length || 0}</p>
          </div>

          {currentTrade.sector && (
            <div className="flex gap-2">
              <span>Sector:</span>
              <MyLink
                href={`/${lang}/a/collections/sectors/${currentTrade.sector.username}`}
                className="font-medium"
              >
                {currentTrade.sector.name}
              </MyLink>
            </div>
          )}

          {currentTrade.parent_trade && (
            <div className="flex gap-2">
              <span>Parent:</span>
              <p className="font-medium">{currentTrade.parent_trade.name}</p>
            </div>
          )}

          {currentTrade.created_at && (
            <div className="flex gap-2">
              <span>Created:</span>
              <p className="font-medium">
                {formatReadableDate(currentTrade.created_at)}
              </p>
            </div>
          )}

          {currentTrade.updated_at && (
            <div className="flex gap-2">
              <span>Updated:</span>
              <p className="font-medium">
                {formatReadableDate(currentTrade.updated_at)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TradeHeader;
