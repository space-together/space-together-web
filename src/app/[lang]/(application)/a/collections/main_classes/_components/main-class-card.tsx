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
import type { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";

interface Props {
  lang: Locale;
  mainClass: MainClassModelWithOthers;
}

const MainClassCard = ({ lang, mainClass }: Props) => {
  const { trade } = mainClass;

  return (
    <Card className={cn("relative")}>
      <CardHeader>
        <div className="flex flex-col">
          <MyLink
            href={`/${lang}/a/collections/main_classes/${mainClass.username}`}
          >
            <LoadingIndicatorText
              element="h3"
              className="h6 line-clamp-1"
              title={mainClass.name}
            >
              {mainClass.name}
            </LoadingIndicatorText>
          </MyLink>

          <MyLink
            href={`/${lang}/a/collections/main_classes/${mainClass.username}`}
          >
            <LoadingIndicatorText element="span" title={mainClass.username}>
              @ {mainClass.username}
            </LoadingIndicatorText>
          </MyLink>
        </div>
      </CardHeader>

      <CardContent>
        {mainClass.description && (
          <p className="line-clamp-2 mb-2">{mainClass.description}</p>
        )}

        <ul className="flex flex-wrap gap-4 text-sm">
          {mainClass.level && (
            <li title="Class level" className="flex items-center gap-1">
              <FaGraduationCap />
              <span className="capitalize">{mainClass.level}</span>
            </li>
          )}

          {trade && (
            <li
              title={`Trade: ${trade.name}`}
              className="flex items-center gap-1"
            >
              <BsLayers />
              <MyLink href={`/${lang}/a/collections/trades/${trade?.username}`}>
                <LoadingIndicatorText className="flex items-center gap-1">
                  <span>{trade.name}</span>
                </LoadingIndicatorText>
              </MyLink>
            </li>
          )}

          {mainClass.trade_id && (
            <li title="Linked trade" className="flex items-center gap-1">
              <BsPersonLinesFill />
              <span>Assigned to trade</span>
            </li>
          )}

          {mainClass.disable && (
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
            href={`/${lang}/a/collections/main_classes/${mainClass.username}`}
            button={{
              variant: "primary",
              library: "daisy",
              size: "sm",
            }}
          >
            View class
          </MyLink>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default MainClassCard;
