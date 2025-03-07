"use client";

import { useEffect, useState } from "react";
import { getAllMainClassAPI } from "@/services/data/api-fetch-data";
import { ClassRoom } from "../../../../../prisma/prisma/generated";
import { Locale } from "@/i18n";
import NotFoundItemsPage from "@/components/page/not-found-items-page";
import MainClassCard from "@/components/cards/main-class-card";

interface props {
  lang: Locale;
}

export default function MainClassesBody({ lang }: props) {
  const [mainClass, setMainClass] = useState<ClassRoom[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await getAllMainClassAPI();
        console.log("Fetched Data:", response);
        if (response.data && Array.isArray(response.data)) {
          setMainClass(response.data);
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
      {mainClass.length === 0 ? (
        <NotFoundItemsPage
          description={"No main classes found, create new ones or refetch."}
        />
      ) : (
        <div className=" grid gap-4 grid-cols-3">
          {mainClass.map((item) => (
            <MainClassCard lang={lang} key={item.id} mainClass={item} />
          ))}
        </div>
      )}
    </div>
  );
}
