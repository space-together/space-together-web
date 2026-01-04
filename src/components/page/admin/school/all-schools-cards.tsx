"use client";
import SchoolCard from "@/components/cards/school-card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";

interface props {
  lang: Locale;
  auth: AuthContext;
  schools: School[];
  realtimeEnabled?: boolean;
}

const AllSchoolsCards = ({
  lang,
  auth,
  schools,
  realtimeEnabled = true,
}: props) => {
  const { data: initialSchools, isConnected } =
    useRealtimeData<School>("school");
  const [displaySchools, setDisplaySchools] = useState<School[]>(schools);

  useEffect(() => {
    if (realtimeEnabled && initialSchools) {
      setDisplaySchools(initialSchools as School[]);
    } else if (!realtimeEnabled) {
      setDisplaySchools(initialSchools);
    }
  }, [initialSchools, realtimeEnabled]);

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displaySchools.map((school) => {
        return (
          <SchoolCard
            school={school}
            key={school._id || school.username}
            lang={lang}
          />
        );
      })}
    </div>
  );
};

export default AllSchoolsCards;
