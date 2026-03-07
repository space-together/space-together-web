import AppPageHeader from "@/components/page/common/app-page-header";
import ParentAnnouncementCard from "@/components/parent/parent-announcement-card";
import ParentChildCard from "@/components/parent/parent-child-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { parentService } from "@/service/parent/parent.service";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Parent Dashboard",
    description: "View your children's academic progress and school information",
  };
};

export default async function ParentDashboardPage(
  props: PageProps<"/[lang]/pr">,
) {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const dashboard = await parentService.getDashboard({
    token: auth.token,
    schoolToken: auth.schoolToken,
  });

  if (!dashboard) {
    return (
      <div className="container mx-auto p-6">
        <AppPageHeader
          title="Parent Dashboard"
          description="View your children's academic progress"
        />
        <div className="mt-6">
          <p className="text-muted-foreground">
            Unable to load dashboard data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AppPageHeader
        title="Parent Dashboard"
        description="View your children's academic progress"
      />

      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.total_children} {dashboard.total_children === 1 ? "Child" : "Children"}
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Your Children</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboard.children.map((child) => (
              <ParentChildCard
                key={child.student_id}
                child={child}
                lang={lang as Locale}
              />
            ))}
          </div>
        </div>

        {dashboard.latest_announcements.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Latest Announcements</h2>
              <Link
                href={`/${lang}/pr/announcements`}
                className="text-sm text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {dashboard.latest_announcements.slice(0, 4).map((announcement) => (
                <ParentAnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
