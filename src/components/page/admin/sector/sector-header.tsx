import MyAvatar from "@/components/common/image/my-avatar";
import type { Locale } from "@/i18n";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import DeleteSectorDialog from "./deleteSectorDialog";
import UpdateSectorDialog from "./updateSectorDialog";

interface SectorHeaderProps {
  sector: SectorModel;
  lang: Locale;
  auth: AuthContext;
}

const SectorHeader = ({ sector, auth }: SectorHeaderProps) => {
  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      {sector.logo && (
        <MyAvatar classname=" object-contain" size="2xl" src={sector.logo} />
      )}
      <div className="flex flex-col gap-4">
        <div className=" flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h4 className="h4">{sector.name}</h4>
            <p className="text-xl font-normal opacity-80">@{sector.username}</p>
            <div className=" flex gap-4 ml-4">
              <UpdateSectorDialog auth={auth} sector={sector} />
              <DeleteSectorDialog auth={auth} sector={sector} />
            </div>
          </div>
          <p className="text-sm">{sector.description}</p>
        </div>
        <div className=" grid grid-cols-3 gap-x-4 gap-y-2">
          <div className="flex gap-2 items-center">
            <span>Type:</span>
            <p className=" capitalize font-medium">{sector.type}</p>
          </div>
          {sector.curriculum && (
            <div className="flex gap-2">
              <span>Curriculum:</span>
              <p className="font-medium">
                {sector.curriculum[0]} - {sector.curriculum[1]}
              </p>
            </div>
          )}
          {sector.country && (
            <div className="flex gap-2">
              <span>Country:</span>
              <p className="font-medium">{sector.country}</p>
            </div>
          )}
          {sector.created_at && (
            <div className="flex gap-2">
              <span>Created:</span>
              <p className="font-medium">
                {formatReadableDate(sector.created_at)}
              </p>
            </div>
          )}
          {sector.updated_at && (
            <div className="flex gap-2">
              <span>Updated:</span>
              <p className="font-medium">
                {formatReadableDate(sector.updated_at)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectorHeader;
