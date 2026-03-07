import NotFoundPage from "@/components/page/not-found";
import AssignRoleDialog from "@/components/page/role/dialogs/assign-role-dialog";
import RoleDialog from "@/components/page/role/dialogs/role-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Permission, Role } from "@/lib/schema/role/role-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Role Details",
    description: "View role details and permissions",
  };
};

// Group permissions by domain
const groupPermissionsByDomain = (
  permissions: string[],
  allPermissions: Permission[],
) => {
  const grouped: Record<string, Permission[]> = {};

  for (const permName of permissions) {
    const perm = allPermissions.find((p) => p.name === permName);
    if (!perm) continue;

    const domain = perm.name.split(".")[0];
    if (!grouped[domain]) {
      grouped[domain] = [];
    }
    grouped[domain].push(perm);
  }

  return grouped;
};

const getScopeBadgeVariant = (scope: string) => {
  switch (scope) {
    case "Own":
      return "default";
    case "Class":
      return "secondary";
    case "School":
      return "outline";
    default:
      return "default";
  }
};

const RoleDetailPage = async (
  props: PageProps<"/[lang]/a/roles/[roleId]">,
) => {
  const params = await props.params;
  const { lang, roleId } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (auth.user.role !== "ADMIN") {
    return (
      <NotFoundPage message="You need admin privileges to access this page" />
    );
  }

  const [role_res, permissions_res] = await Promise.all([
    apiRequest<void, Role>("get", `/roles/${roleId}`, undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),
    apiRequest<void, Permission[]>("get", "/roles/permissions", undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),
  ]);

  if (!role_res.data) {
    return <NotFoundPage message="Role not found" />;
  }

  const role = role_res.data;
  const allPermissions = permissions_res.data ?? [];
  const groupedPermissions = groupPermissionsByDomain(
    role.permissions,
    allPermissions,
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{role.name}</h1>
          <p className="text-muted-foreground">{role.description}</p>
        </div>
        <div className="flex gap-2">
          <RoleDialog auth={auth} role={role} />
          <AssignRoleDialog auth={auth} roleId={roleId} />
        </div>
      </div>

      {/* Role Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Role Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-muted-foreground text-sm">Type</p>
              <Badge
                variant={role.role_type === "System" ? "default" : "outline"}
              >
                {role.role_type}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Status</p>
              <Badge variant={role.is_active ? "success" : "destructive"}>
                {role.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Permissions</p>
              <p className="font-medium">{role.permissions.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Created</p>
              <p className="font-medium">
                {role.created_at
                  ? new Date(role.created_at).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedPermissions).map(([domain, perms]) => (
              <div key={domain} className="space-y-2">
                <h4 className="font-medium capitalize">{domain}</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {perms.map((perm) => (
                    <div
                      key={perm.name}
                      className="border-input flex items-center justify-between rounded-md border p-3"
                    >
                      <span className="text-sm">{perm.description}</span>
                      <Badge variant={getScopeBadgeVariant(perm.scope)}>
                        {perm.scope}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleDetailPage;
