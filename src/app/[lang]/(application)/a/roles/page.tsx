import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import RoleDialog from "@/components/page/role/dialogs/role-dialog";
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
    title: "Role Management",
    description: "Manage roles and permissions",
  };
};

const AdminRolesPage = async (props: PageProps<"/[lang]/a/roles">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  // Only admins can access
  if (auth.user.role !== "ADMIN") {
    return (
      <NotFoundPage message="You need admin privileges to access this page" />
    );
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
          description="Manage roles and permissions."
          action={<RoleDialog auth={auth} />}
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

export default AdminRolesPage;
