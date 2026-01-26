import { AnnouncementDashboardCard } from "@/components/common/cards/announcement-card";
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
  >("get", `/school/announcements/others?limit=5`, undefined, {
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
        <CardContent className=" flex flex-col gap-3">
          {announcements.data?.data.map((announcement) => (
            <AnnouncementDashboardCard
              key={announcement._id}
              auth={auth}
              isCommentOpen={false}
              announcement={announcement}
              lang={lang}
            />
          ))}
          <MyLink
            href={`/${lang}/s-t/announcements`}
            className={" text-center flex items-center justify-center text-sm"}
          >
            <LoadingIndicatorText>
              View all announements ({announcements.data?.total})
            </LoadingIndicatorText>
          </MyLink>
        </CardContent>
      </Card>
    </RealtimeProvider>
  );
};

export default DashboardAnnouncements;
