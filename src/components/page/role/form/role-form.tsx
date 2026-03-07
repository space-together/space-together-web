"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";

import {
    RoleBaseSchema,
    type Permission,
    type Role,
    type RoleBase,
} from "@/lib/schema/role/role-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
  role?: Role;
}

// Group permissions by domain
const groupPermissionsByDomain = (permissions: Permission[]) => {
  const grouped: Record<string, Permission[]> = {};

  for (const perm of permissions) {
    const domain = perm.name.split(".")[0];
    if (!grouped[domain]) {
      grouped[domain] = [];
    }
    grouped[domain].push(perm);
  }

  return grouped;
};

const RoleForm = ({ auth, role }: Props) => {
  const [availablePermissions, setAvailablePermissions] = useState<Permission[]>([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const { addItem, updateItem } = useRealtimeData<Role>("role");

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await apiRequest<void, Permission[]>(
          "get",
          "/roles/permissions",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (res?.data) {
          setAvailablePermissions(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch permissions", err);
      } finally {
        setLoadingPermissions(false);
      }
    };

    fetchPermissions();
  }, [auth]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    RoleBase,
    Role
  >({
    schema: RoleBaseSchema,
    formOptions: {
      defaultValues: {
        name: role?.name ?? "",
        description: role?.description ?? "",
        role_type: role?.role_type ?? "Custom",
        permissions: role?.permissions ?? [],
        is_active: role?.is_active ?? true,
        school_id: auth.school?.id,
      },
    },

    transform: (values) => ({
      ...values,
      school_id: auth.school?.id,
    }),

    request: {
      method: role ? "put" : "post",
      url: role ? `/roles/${role._id || role.id}` : "/roles",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: role
      ? "Role updated successfully"
      : "Role created successfully",

    toastOnError: true,
    onSuccess: (data) => {
      if (role) {
        updateItem(data as Role);
      } else {
        addItem(data as Role);
        form.reset();
      }
    },
  });

  const selectedPermissions = form.watch("permissions");
  const groupedPermissions = groupPermissionsByDomain(availablePermissions);

  const togglePermission = (permissionName: string) => {
    const current = selectedPermissions || [];
    const updated = current.includes(permissionName)
      ? current.filter((p) => p !== permissionName)
      : [...current, permissionName];
    form.setValue("permissions", updated);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="name"
              label="Role Name"
              required
              placeholder="e.g. Teacher Assistant"
              disabled={isPending || role?.role_type === "System"}
            />

            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              fieldType="textarea"
              placeholder="Describe what this role can do"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="is_active"
              label="Active"
              fieldType="checkbox"
              disabled={isPending}
            />
          </div>

          {/* Right column - Permissions */}
          <div className="flex w-full flex-col gap-4">
            <div className="space-y-2">
              <Label>
                Permissions <span className="text-error">*</span>
              </Label>

              {loadingPermissions ? (
                <div className="text-muted-foreground text-sm">
                  Loading permissions...
                </div>
              ) : (
                <div className="border-input bg-background max-h-[400px] space-y-4 overflow-y-auto rounded-md border p-4">
                  {Object.entries(groupedPermissions).map(([domain, perms]) => (
                    <div key={domain} className="space-y-2">
                      <h4 className="font-medium capitalize">{domain}</h4>
                      <div className="space-y-2">
                        {perms.map((perm) => (
                          <div
                            key={perm.name}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={perm.name}
                              checked={selectedPermissions?.includes(perm.name)}
                              onCheckedChange={() => togglePermission(perm.name)}
                              disabled={isPending || role?.role_type === "System"}
                            />
                            <label
                              htmlFor={perm.name}
                              className="flex flex-1 cursor-pointer items-center justify-between text-sm"
                            >
                              <span>{perm.description}</span>
                              <Badge variant={getScopeBadgeVariant(perm.scope)}>
                                {perm.scope}
                              </Badge>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {form.formState.errors.permissions && (
                <p className="text-error text-sm">
                  {form.formState.errors.permissions.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" library="daisy">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="info"
            library="daisy"
            disabled={isPending || loadingPermissions || role?.role_type === "System"}
            role={isPending ? "loading" : undefined}
          >
            {role ? "Update Role" : "Create Role"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default RoleForm;
