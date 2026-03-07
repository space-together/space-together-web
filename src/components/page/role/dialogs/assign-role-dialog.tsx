"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";

import {
  RoleAssignmentSchema,
  type Role,
  type RoleAssignment,
} from "@/lib/schema/role/role-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

import type { Paginated } from "@/lib/schema/common-schema";
import { UserModel } from "@/lib/schema/user/user-schema";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
  roleId?: string;
  onSuccess?: () => void;
}

const AssignRoleDialog = ({ auth, roleId, onSuccess }: Props) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          apiRequest<void, Paginated<UserModel>>(
            "get",
            "/school/users?limit=100",
            undefined,
            {
              token: auth.token,
              schoolToken: auth.schoolToken,
            },
          ),
          apiRequest<void, Paginated<Role>>(
            "get",
            "/roles?limit=100",
            undefined,
            {
              token: auth.token,
              schoolToken: auth.schoolToken,
            },
          ),
        ]);

        if (usersRes?.data?.data) {
          setUsers(usersRes.data.data);
        }
        if (rolesRes?.data?.data) {
          setRoles(rolesRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch options", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    RoleAssignment,
    any
  >({
    schema: RoleAssignmentSchema,
    formOptions: {
      defaultValues: {
        user_id: "",
        role_id: roleId ?? "",
        school_id: auth.school?.id ?? "",
      },
    },

    request: {
      method: "post",
      url: "/roles/assign",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: "Role assigned successfully",

    toastOnError: true,
    onSuccess: () => {
      form.reset();
      onSuccess?.();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" library="daisy" size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Assign Role
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Role to User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CommonFormField
              control={form.control}
              name="user_id"
              label="User"
              fieldType="searchSelect"
              required
              placeholder={loadingOptions ? "Loading users..." : "Select a user"}
              disabled={isPending || loadingOptions}
              selectOptions={users.map((u) => ({
                value: String(u.id ?? u._id),
                label: `${u.name} (${u.email})`,
              }))}
            />

            <CommonFormField
              control={form.control}
              name="role_id"
              label="Role"
              fieldType="searchSelect"
              required
              placeholder={loadingOptions ? "Loading roles..." : "Select a role"}
              disabled={isPending || loadingOptions || !!roleId}
              selectOptions={roles
                .filter((r) => r.is_active)
                .map((r) => ({
                  value: String(r.id ?? r._id),
                  label: r.name,
                }))}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" library="daisy">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                variant="info"
                library="daisy"
                disabled={isPending || loadingOptions}
                role={isPending ? "loading" : undefined}
              >
                Assign Role
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignRoleDialog;
