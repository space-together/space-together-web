"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { SchoolBackup } from "@/lib/schema/backup-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { useState, useTransition } from "react";

interface Props {
  backup: SchoolBackup;
  auth: AuthContext;
  onSuccess: () => void;
}

export default function RestoreDialog({ backup, auth, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleRestore = () => {
    if (confirmText !== "RESTORE") {
      showToast({
        title: "Invalid confirmation",
        description: 'Please type "RESTORE" to confirm',
        type: "warning",
      });
      return;
    }

    startTransition(async () => {
      const res = await apiRequest<void, SchoolBackup>(
        "post",
        `/backups/${backup.id || backup._id}/restore`,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );

      if (res.data) {
        showToast({
          title: "Restore started",
          description: "Database restore is in progress. This may take a few minutes.",
          type: "success",
        });
        setOpen(false);
        setConfirmText("");
        onSuccess();
      } else {
        showToast({
          title: "Failed to restore backup",
          description: res.message,
          type: "error",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" library="daisy">
          <RotateCcw className="size-4" />
          Restore
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-warning" />
            Restore Backup
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <p className="font-semibold text-warning">
              ⚠️ This action will replace all current school data with the selected
              backup.
            </p>
            <p>This action cannot be undone. All current data will be lost.</p>
            <p className="text-sm">
              Backup: <span className="font-mono">{backup.backup_name}</span>
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirm">
              Type <span className="font-mono font-bold">RESTORE</span> to confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="RESTORE"
              className="font-mono"
              disabled={isPending}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            library="daisy"
            onClick={() => {
              setOpen(false);
              setConfirmText("");
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="error"
            library="daisy"
            onClick={handleRestore}
            disabled={isPending || confirmText !== "RESTORE"}
          >
            {isPending ? "Restoring..." : "Restore Backup"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
