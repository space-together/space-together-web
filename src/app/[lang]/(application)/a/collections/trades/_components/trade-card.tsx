"use client";

import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { BsLayers, BsPersonLinesFill } from "react-icons/bs";
import { FaBan, FaGraduationCap } from "react-icons/fa6";

import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";

interface Props {
  lang: Locale;
  trade: TradeModule;
}

const TradeCard = ({ lang, trade }: Props) => {
  return (
    <Card className={cn("relative")}>
      <CardHeader>
        <div className="flex flex-col">
          <MyLink href={`/${lang}/a/collections/trades/${trade.username}`}>
            <LoadingIndicatorText
              element="h3"
              className="h6 line-clamp-1"
              title={trade.name}
            >
              {trade.name}
            </LoadingIndicatorText>
          </MyLink>

          <MyLink href={`/${lang}/a/collections/trades/${trade.username}`}>
            <LoadingIndicatorText element="span" title={trade.username}>
              @ {trade.username}
            </LoadingIndicatorText>
          </MyLink>
        </div>
      </CardHeader>

      <CardContent>
        {trade.description && (
          <p className="line-clamp-2 mb-2">{trade.description}</p>
        )}

        <ul className="flex flex-wrap gap-4 text-sm">
          <li title="Trade type" className="flex items-center gap-1 capitalize">
            <BsLayers />
            <span>{trade.type}</span>
          </li>

          <li title="Class range" className="flex items-center gap-1">
            <FaGraduationCap />
            <span>
              Class {trade.class_min} – {trade.class_max}
            </span>
          </li>

          {trade.trade_id && (
            <li title="Parent trade" className="flex items-center gap-1">
              <BsPersonLinesFill />
              <span>Sub-trade</span>
            </li>
          )}

          {trade.disable && (
            <li
              title="Disabled"
              className="flex items-center gap-1 text-error font-medium"
            >
              <FaBan />
              <span>Disabled</span>
            </li>
          )}
        </ul>

        <CardFooter className="flex flex-row gap-2 mt-3">
          <MyLink
            href={`/${lang}/a/collections/trades/${trade.username}`}
            button={{
              variant: "primary",
              library: "daisy",
              size: "sm",
            }}
          >
            View trade
          </MyLink>

          {/* <MyLink
            href={`/${lang}/trade/${trade.username}`}
            button={{
              variant: "outline",
              library: "daisy",
              role: "page",
              size: "sm",
            }}
          >
            About
          </MyLink> */}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TradeCard;
