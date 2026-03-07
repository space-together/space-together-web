"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Role } from "@/lib/schema/role/role-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  auth: AuthContext;
  role: Role;
}

export default function DeleteRoleDialog({ auth, role }: Props) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();
  const { deleteItem } = useRealtimeData<Role>("role");

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await apiRequest(
        "delete",
        `/roles/${role._id || role.id}`,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );

      if (res.data) {
        showToast({
          title: "Role Deleted",
          description: "Role has been deleted successfully",
          type: "success",
        });
        deleteItem(role._id || role.id || "");
        setOpen(false);
      } else {
        showToast({
          title: "Delete Failed",
          description: res.message || "Could not delete role",
          type: "error",
        });
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: "An error occurred while deleting the role",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button  variant="error" size="sm" library="daisy">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Role</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the role "{role.name}"? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" library="daisy" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="error"
            library="daisy"
            onClick={handleDelete}
            disabled={isDeleting}
            role={isDeleting ? "loading" : undefined}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
