"use client";
import SectorDialog from "@/app/[lang]/(application)/a/collections/sectors/_components/sector-dailog";
import MyAvatar from "@/components/common/image/my-avatar";
import { OpenImages } from "@/components/common/image/open-images";
import type { Locale } from "@/i18n";
import { useRealtimeItem } from "@/lib/hooks/use-realtime-list";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import DeleteSectorDialog from "./deleteSectorDialog";

interface SectorHeaderProps {
  sector: SectorModel;
  lang: Locale;
  auth: AuthContext;
}

const SectorHeader = ({ sector, auth }: SectorHeaderProps) => {
  const item = useRealtimeItem<SectorModel>("sector", sector);
  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      {item.logo && (
        <OpenImages
          images={[item.logo]}
          component={
            <MyAvatar
              classname=" object-contain"
              size="2xl"
              src={item.logo}
              alt={item.name}
              type="square"
              className="rounded-none"
            />
          }
        />
      )}

      <div className="flex flex-col gap-4">
        <div className=" flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h4 className="h4">{item.name}</h4>
            <p className="text-xl font-normal opacity-80">@{item.username}</p>
            <div className=" flex gap-4 ml-4">
              <SectorDialog auth={auth} sector={item} />
              <DeleteSectorDialog auth={auth} sector={item} />
            </div>
          </div>
          <p className="text-sm">{item.description}</p>
        </div>
        <div className=" grid grid-cols-3 gap-x-4 gap-y-2">
          <div className="flex gap-2 items-center">
            <span>Type:</span>
            <p className=" capitalize font-medium">{item.type}</p>
          </div>
          {item.curriculum && (
            <div className="flex gap-2">
              <span>Curriculum:</span>
              <p className="font-medium">
                {item.curriculum[0]} - {item.curriculum[1]}
              </p>
            </div>
          )}
          {item.country && (
            <div className="flex gap-2">
              <span>Country:</span>
              <p className="font-medium">{item.country}</p>
            </div>
          )}
          {item.created_at && (
            <div className="flex gap-2">
              <span>Created:</span>
              <p className="font-medium">
                {formatReadableDate(item.created_at)}
              </p>
            </div>
          )}
          {item.updated_at && (
            <div className="flex gap-2">
              <span>Updated:</span>
              <p className="font-medium">
                {formatReadableDate(item.updated_at)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectorHeader;
