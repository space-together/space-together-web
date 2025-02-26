"use client";

import { useEffect, useState } from "react";
import { getAllEducationAPI } from "@/services/data/api-fetch-data";
import { Education } from "../../../../../prisma/prisma/generated";
import { Locale } from "@/i18n";
import EducationCard from "@/components/cards/education-card";
import NotFoundItemsPage from "@/components/page/not-found-items-page";

interface props {
  lang : Locale;
}

export default function EducationBody({lang} : props) {
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await getAllEducationAPI();
        console.log("Fetched Data:", response);
        if (response.data && Array.isArray(response.data)) {
          setEducationData(response.data);
        } else {
          setError("Unexpected API response format");
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch education data");
      }
    };

    fetchEducation();
    const interval = setInterval(fetchEducation, 5000); // Fetch updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {educationData.length === 0 ? (
       <NotFoundItemsPage description={"No educations found, create new ones or refetch."} />
      ) : (
        <div className=" grid gap-4 grid-cols-3">
          {educationData.map((edu) => (
           <EducationCard
           education={edu}
           lang={lang}
           key={edu.username}
         />
          ))}
        </div>
      )}
    </div>
  );
}
