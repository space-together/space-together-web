"use client";
import SchoolCard from "@/components/cards/school-card";
import CommonEmpty from "@/components/common/common-empty";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { School } from "@/lib/schema/relations-schema";
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

  if (displaySchools.length === 0 && schools.length === 0)
    return (
      <CommonEmpty
        title="It look they are no schools "
        description="you can create new school"
      >
        <MyLink
          button={{
            library: "daisy",
            type: "button",
            variant: "primary",
            role: "create",
            size: "sm",
          }}
          href={`/${lang}/a/collections/schools/new`}
        >
          <LoadingIndicatorText>create new school</LoadingIndicatorText>
        </MyLink>
      </CommonEmpty>
    );

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displaySchools.map((school) => {
        return (
          <SchoolCard
            school={school}
            key={school.id || school._id}
            lang={lang}
          />
        );
      })}
    </div>
  );
};

export default AllSchoolsCards;
