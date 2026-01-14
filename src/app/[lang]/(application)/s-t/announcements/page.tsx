import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";
import AllAnnouncementsCards from "./_components/all-announcements-cards";
import AnnouncementFilter from "./_components/announcement-filter";
import AnnouncementTable from "./_components/announcement-table";
import type { AnnouncementWithRelations } from "./_schema/announcement";

const AnnouncementsPage = async (
  props: PageProps<"/[lang]/s-t/announcements">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const announcements = await apiRequest<
    void,
    Paginated<AnnouncementWithRelations>
  >("get", `/school/announcements/others?limit=${LIMIT}`, undefined, {
    token: auth.token,
    schoolToken: auth.schoolToken,
    realtime: "announcement",
  });
  return (
    <RealtimeProvider<AnnouncementWithRelations>
      channels={[
        {
          name: "announcement",
          initialData: announcements.data?.data ?? [],
        },
      ]}
    >
      <div>
        <AppPageHeader title="Announcements" />
        <AnnouncementFilter
          lang={lang as Locale}
          auth={auth}
          data={announcements?.data}
        />
        <Separator />
        <DisplaySwitcher
          page="announcements"
          table={
            <AnnouncementTable
              auth={auth}
              lang={lang as Locale}
              data={announcements?.data?.data ?? []}
            />
          }
          cards={
            <AllAnnouncementsCards
              auth={auth}
              lang={lang as Locale}
              data={announcements?.data?.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};

export default AnnouncementsPage;
