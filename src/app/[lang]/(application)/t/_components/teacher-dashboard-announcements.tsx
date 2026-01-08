import AnnouncementCard from "@/components/common/cards/announcement-card";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface TeacherDashboardAnnouncementsProps {
  announcements?: any[];
  auth: AuthContext;
  lang: Locale;
}

const TeacherDashboardAnnouncements = ({
  announcements,
  auth,
  lang,
}: TeacherDashboardAnnouncementsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(4)].map((_, index) => (
        <AnnouncementCard auth={auth} key={index} />
      ))}
    </div>
  );
};

export default TeacherDashboardAnnouncements;
