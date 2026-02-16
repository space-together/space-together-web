"use client";
import ParentCard from "@/components/cards/parent-card";
import EmptyParents from "@/components/page/school-staff/parents-components/empty-parents";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  lang: Locale;
  auth: AuthContext;
  parents: ParentWithRelations[];
  realtimeEnabled?: boolean;
}

const AllParentsCards = ({
  lang,
  auth,
  parents,
  realtimeEnabled = true,
}: props) => {
  const displayParents = useRealtimeList<ParentWithRelations>(
    "parent",
    parents,
    realtimeEnabled,
  );

  if (displayParents.length === 0 && parents.length === 0)
    return <EmptyParents isSchool auth={auth} />;

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayParents.map((parent) => {
        return (
          <ParentCard
            key={parent._id}
            isSchoolStaff
            lang={lang}
            auth={auth}
            parent={parent}
          />
        );
      })}
    </div>
  );
};

export default AllParentsCards;
