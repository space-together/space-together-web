"use client";

import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { BsCalendarRange } from "react-icons/bs";
import { FaLayerGroup, FaLocationDot } from "react-icons/fa6";

import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import MyAvatar from "../common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "../common/myLink";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Props {
  lang: Locale;
  sector: SectorModel;
}

const SectorCard = ({ lang, sector }: Props) => {
  return (
    <Card className={cn("relative")}>
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <MyLink href={`/${lang}/a/collections/sectors/${sector.username}`}>
            <MyAvatar
              type="square"
              className="rounded-none"
              classname="rounded-none"
              src={sector.logo}
              alt={sector.name}
            />
          </MyLink>

          <div className="flex flex-col">
            <MyLink href={`/${lang}/a/collections/sectors/${sector.username}`}>
              <LoadingIndicatorText
                element="h3"
                className="h6 line-clamp-1"
                title={sector.name}
              >
                {sector.name}
              </LoadingIndicatorText>
            </MyLink>

            <MyLink href={`/${lang}/a/collections/sectors/${sector.username}`}>
              <LoadingIndicatorText element="span" title={sector.username}>
                @ {sector.username}
              </LoadingIndicatorText>
            </MyLink>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {sector.description && (
          <p className="line-clamp-2 mb-2">{sector.description}</p>
        )}

        <ul className="flex flex-wrap gap-4 text-sm">
          <li
            title="Sector type"
            className="flex items-center gap-1 capitalize"
          >
            <FaLayerGroup />
            <span>{sector.type}</span>
          </li>

          <li title="Country" className="flex items-center gap-1 capitalize">
            <FaLocationDot />
            <span>{sector.country}</span>
          </li>

          {sector.curriculum && (
            <li title="Curriculum duration" className="flex items-center gap-1">
              <BsCalendarRange />
              <span>
                {sector.curriculum[0]} – {sector.curriculum[1]}
              </span>
            </li>
          )}

          {sector.disable && (
            <li className="text-error font-medium">Disabled</li>
          )}
        </ul>

        <CardFooter className="flex flex-row gap-2 mt-3">
          <MyLink
            href={`/${lang}/a/collections/sectors/${sector.username}`}
            button={{
              variant: "primary",
              library: "daisy",
              size: "sm",
            }}
          >
            View sector
          </MyLink>

          {/* <MyLink
            href={`/${lang}/sector/${sector.username}`}
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

export default SectorCard;
