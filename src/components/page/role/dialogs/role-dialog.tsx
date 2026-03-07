"use client";

import RoleForm from "@/components/page/role/form/role-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Role } from "@/lib/schema/role/role-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  role?: Role;
}

const RoleDialog = ({ auth, role }: Props) => {
  const isSystemRole = role?.role_type === "System";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={role ? undefined : "create"}
          library="daisy"
          variant={role ? "outline" : "primary"}
          size="sm"
          disabled={isSystemRole}
        >
          {role ? (isSystemRole ? "View" : "Edit") : "Create Role"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {role
              ? isSystemRole
                ? `View ${role.name}`
                : `Edit ${role.name}`
              : "Create Role"}
          </DialogTitle>
        </DialogHeader>

        <RoleForm auth={auth} role={role} />
      </DialogContent>
    </Dialog>
  );
};

export default RoleDialog;
