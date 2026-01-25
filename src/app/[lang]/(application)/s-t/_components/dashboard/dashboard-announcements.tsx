import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface DashboardAnnouncementsProps {
  lang: Locale;
  auth: AuthContext;
}

const DashboardAnnouncements = ({
  lang,
  auth,
}: DashboardAnnouncementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome to Space Together! We are excited to have you on board.</p>
      </CardContent>
    </Card>
  );
};

export default DashboardAnnouncements;
