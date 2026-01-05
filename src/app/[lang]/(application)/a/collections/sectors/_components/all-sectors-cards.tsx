"use client";
import SectorCard from "@/components/cards/sector-card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  lang: Locale;
  auth: AuthContext;
  sectors: SectorModel[];
  realtimeEnabled?: boolean;
}

const AllSectorsCards = ({ lang, sectors, realtimeEnabled = true }: props) => {
  const displaySectors = useRealtimeList<SectorModel>(
    "sector",
    sectors,
    realtimeEnabled,
  );

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displaySectors.map((sector) => {
        return (
          <SectorCard
            key={sector._id || sector.username}
            sector={sector}
            lang={lang}
          />
        );
      })}
    </div>
  );
};

export default AllSectorsCards;
