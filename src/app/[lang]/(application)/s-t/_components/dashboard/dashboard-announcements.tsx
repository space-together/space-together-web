import AddAnnouncementDialog from "@/components/common/dialog/add-announcement-dialog";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { AnnouncementWithRelations } from "../../announcements/_schema/announcement";

interface DashboardAnnouncementsProps {
  lang: Locale;
  auth: AuthContext;
}

const DashboardAnnouncements = async ({
  lang,
  auth,
}: DashboardAnnouncementsProps) => {
  const announcements = await apiRequest<
    void,
    Paginated<AnnouncementWithRelations>
  >("get", `/school/announcements?limit=5`, undefined, {
    token: auth.token,
    schoolToken: auth.schoolToken,
  });
  return (
    <RealtimeProvider<AnnouncementWithRelations>
      channels={[
        {
          name: "announcement",
          initialData: announcements.data?.data ?? [],
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <Card>
        <CardHeader className=" flex flex-row justify-between items-center">
          <MyLink href={`/${lang}/s-t/announcements`}>
            <LoadingIndicatorText element="span">
              <CardTitle>Announcements</CardTitle>
            </LoadingIndicatorText>
          </MyLink>
          <AddAnnouncementDialog
            auth={auth}
            button={{
              role: "create",
              variant: "primary",
              library: "daisy",
              size: "sm",
            }}
            lang={lang}
            name="New"
          />
        </CardHeader>
        <CardContent>
          <p>Welcome to Space Together! We are excited to have you on board.</p>
        </CardContent>
      </Card>
    </RealtimeProvider>
  );
};

export default DashboardAnnouncements;
