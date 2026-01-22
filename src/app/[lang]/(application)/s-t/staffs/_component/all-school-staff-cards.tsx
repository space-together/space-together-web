"use client";
import EmptyStudents from "@/components/page/school-staff/students-components/empty-students";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import SchoolStaffCard from "./school-staff-card";

interface props {
  lang: Locale;
  auth: AuthContext;
  data: SchoolStaff[];
  realtimeEnabled?: boolean;
}

const AllSchoolStaffCards = ({
  lang,
  auth,
  data,
  realtimeEnabled = true,
}: props) => {
  const displayStaff = useRealtimeList<SchoolStaff>(
    "school_staff",
    data,
    realtimeEnabled,
  );

  if (displayStaff.length === 0) return;
  <EmptyStudents isSchool auth={auth} />;

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayStaff.map((student) => {
        return (
          <SchoolStaffCard
            key={student._id}
            isSchoolStaff
            lang={lang}
            auth={auth}
            staff={student}
          />
        );
      })}
    </div>
  );
};

export default AllSchoolStaffCards;
