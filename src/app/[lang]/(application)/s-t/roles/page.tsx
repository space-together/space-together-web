import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import RoleTable from "@/components/page/role/table/table-role-list";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Role } from "@/lib/schema/role/role-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Roles",
    description: "View roles and permissions",
  };
};

const SchoolStaffRolesPage = async (props: PageProps<"/[lang]/s-t/roles">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return <NotFoundPage message="You need to have school to view this page" />;
  }

  const [roles_res] = await Promise.all([
    apiRequest<void, Paginated<Role>>(
      "get",
      `/roles?limit=${LIMIT}&school_id=${auth.school.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "role",
      },
    ),
  ]);

  return (
    <RealtimeProvider<Role>
      channels={[
        {
          name: "role",
          initialData: roles_res?.data?.data ?? [],
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="space-y-4">
        <AppPageHeader
          total={roles_res.data?.total}
          title="Roles"
          description="View roles and permissions (read-only)."
        />

        <RoleTable
          auth={auth}
          lang={lang}
          roles={roles_res?.data?.data ?? []}
          realtimeEnabled
        />
      </div>
    </RealtimeProvider>
  );
};

export default SchoolStaffRolesPage;
