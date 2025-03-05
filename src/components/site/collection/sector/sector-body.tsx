"use client";

import { useEffect, useState } from "react";
import { getAllEducationAPI, getAllSectorAPI } from "@/services/data/api-fetch-data";
import { Education, Sector } from "../../../../../prisma/prisma/generated";
import { Locale } from "@/i18n";
import NotFoundItemsPage from "@/components/page/not-found-items-page";
import SectorCard from "@/components/cards/sector-card";

interface props {
  lang : Locale;
}

export default function SectorBody({lang} : props) {
  const [sectorData, setSectorData] = useState<Sector[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSector = async () => {
      try {
        const [response , getEducation] = await Promise.all([getAllSectorAPI() , getAllEducationAPI()]);
        if (response.data && Array.isArray(response.data)) {
          setSectorData(response.data);
        } else {
          setError(response.error);
        }
        if (getEducation.data && Array.isArray(getEducation.data)) {
          setEducations(getEducation.data);
        } else {
          setError(getEducation.error);
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
           educations={educations}
         />
          ))}
        </div>
      )}
    </div>
  );
}
