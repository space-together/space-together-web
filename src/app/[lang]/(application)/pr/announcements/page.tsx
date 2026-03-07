import AppPageHeader from "@/components/page/common/app-page-header";
import ParentAnnouncementCard from "@/components/parent/parent-announcement-card";
import { authContext } from "@/lib/utils/auth-context";
import { parentService } from "@/service/parent/parent.service";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Announcements",
    description: "View school announcements",
  };
};

export default async function AnnouncementsPage(
  props: PageProps<"/[lang]/pr/announcements">,
) {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const announcements = await parentService.getAnnouncements({
    token: auth.token,
    schoolToken: auth.schoolToken,
  });

  return (
    <div className="container mx-auto p-6">
      <AppPageHeader
        title="Announcements"
        description="View all school announcements"
      />

      <div className="mt-6">
        {announcements && announcements.data && announcements.data.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {announcements.data.map((announcement) => (
              <ParentAnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No announcements available.</p>
        )}
      </div>
    </div>
  );
}
