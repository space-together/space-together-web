"use client";

import { useEffect, useState } from "react";
import { getAllSectorAPI } from "@/services/data/api-fetch-data";
import { Sector } from "../../../../../prisma/prisma/generated";
import { Locale } from "@/i18n";
import NotFoundItemsPage from "@/components/page/not-found-items-page";
import SectorCard from "@/components/cards/sector-card";

interface props {
  lang : Locale;
}

export default function SectorBody({lang} : props) {
  const [sectorData, setSectorData] = useState<Sector[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSector = async () => {
      try {
        const response = await getAllSectorAPI();
        console.log("Fetched Data:", response);
        if (response.data && Array.isArray(response.data)) {
          setSectorData(response.data);
        } else {
          setError(response.error);
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch Sector data");
      }
    };

    fetchSector();
    const interval = setInterval(fetchSector, 5000); // Fetch updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {sectorData.length === 0 ? (
       <NotFoundItemsPage description={"No Sectors found, create new ones or refetch."} />
      ) : (
        <div className=" grid gap-4 grid-cols-3">
          {sectorData.map((item) => (
           <SectorCard
           sector={item}
           lang={lang}
           key={item.username}
         />
          ))}
        </div>
      )}
    </div>
  );
}
