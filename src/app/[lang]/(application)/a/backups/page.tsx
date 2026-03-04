import BackupsTable from "@/components/page/backup/backups-table";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import type { SchoolBackup } from "@/lib/schema/backup-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Backup Management",
    description: "Manage school backups and restore data",
  };
};

const BackupsPage = async (props: PageProps<"/[lang]/a/backups">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return <NotFoundPage message="You need to have school to view this page" />;
  }

  // Check if user is ADMIN
  if (auth.user.role !== "ADMIN") {
    return (
      <PermissionPage
        lang={lang as Locale}
        description="Only administrators can access backup management"
        role={auth.user.role}
      />
    );
  }

  const [backups_res] = await Promise.all([
    apiRequest<void, Paginated<SchoolBackup>>(
      "get",
      `/backups/others?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  return (
    <div className="space-y-4">
      <AppPageHeader
        total={backups_res.data?.total}
        title="Backups"
        description="Manage school backups and restore data."
      />
      <BackupsTable
        auth={auth}
        lang={lang as Locale}
        backups={backups_res?.data?.data ?? []}
        total={backups_res.data?.total ?? 0}
      />
    </div>
  );
};

export default BackupsPage;
