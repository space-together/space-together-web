"use client";

import SchoolJoinRequestCard from "@/components/cards/school-Join-request-card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import NotFoundItemsPage from "../../not-found-items-page";

interface Props {
  lang: Locale;
  auth: AuthContext;
  requests: JoinSchoolRequestWithRelations[];
  realtimeEnabled?: boolean;
}

const AllJoinSchoolRequestsCards = ({
  lang,
  auth,
  requests,
  realtimeEnabled = true,
}: Props) => {
  const displayRequests = useRealtimeList<JoinSchoolRequestWithRelations>(
    "join_school_request",
    requests,
    realtimeEnabled,
  );

  if (displayRequests.length === 0 && requests.length === 0) {
    return (
      <NotFoundItemsPage description="No join school requests found" />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayRequests.map((request) => (
        <SchoolJoinRequestCard
          key={request._id}
          lang={lang}
          auth={auth}
          request={request}
        />
      ))}
    </div>
  );
};

export default AllJoinSchoolRequestsCards;
