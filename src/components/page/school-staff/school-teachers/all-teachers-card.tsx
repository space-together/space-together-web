"use client";
import TeacherCard from "@/components/cards/teacher-card";
import EmptyTeachers from "@/components/page/school-staff/school-teachers/empty-teachers";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  lang: Locale;
  auth: AuthContext;
  teachers: TeacherWithRelations[];
  realtimeEnabled?: boolean;
}

const AllTeachersCards = ({
  lang,
  auth,
  teachers,
  realtimeEnabled = true,
}: props) => {
  const displayTeachers = useRealtimeList<TeacherWithRelations>(
    "teacher",
    teachers,
    realtimeEnabled,
  );

  if (displayTeachers.length === 0 && teachers.length === 0)
    return <EmptyTeachers isSchool auth={auth} />;
  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayTeachers.map((teacher) => {
        return (
          <TeacherCard
            key={teacher.id || teacher._id}
            isSchoolStaff
            lang={lang}
            auth={auth}
            teacher={teacher}
          />
        );
      })}
    </div>
  );
};

export default AllTeachersCards;
