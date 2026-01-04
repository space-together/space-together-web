"use client";
import SectorCard from "@/components/cards/sector-card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";

interface props {
  lang: Locale;
  auth: AuthContext;
  sectors: SectorModel[];
  realtimeEnabled?: boolean;
}

const AllSectorsCards = ({
  lang,
  auth,
  sectors,
  realtimeEnabled = true,
}: props) => {
  const { data: initialSectors, isConnected } =
    useRealtimeData<SectorModel>("sector");
  const [displaySectors, setDisplaySectors] = useState<SectorModel[]>(sectors);

  useEffect(() => {
    if (realtimeEnabled && initialSectors) {
      setDisplaySectors(initialSectors as SectorModel[]);
    } else if (!realtimeEnabled) {
      setDisplaySectors(sectors);
    }
  }, [initialSectors, realtimeEnabled]);

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
