"use client";
import AnnouncementCard from "@/components/common/cards/announcement-card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { AuthContext } from "@/lib/utils/auth-context";
import type { AnnouncementWithRelations } from "../_schema/announcement";

interface Props {
  lang: Locale;
  auth: AuthContext;
  data: AnnouncementWithRelations[];
}

const AllAnnouncementsCards = ({ lang, auth, data }: Props) => {
  const displayAnnouncement = useRealtimeList<AnnouncementWithRelations>(
    "announcement",
    data,
    true,
  );
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayAnnouncement.map((announcement) => {
          return (
            <AnnouncementCard
              key={announcement._id}
              announcement={announcement}
              lang={lang}
              auth={auth}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllAnnouncementsCards;
