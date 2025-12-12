"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Button,
  type DaisyButtonProps,
  type ShadcnButtonProps,
} from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";

interface DeleteDialogProps {
  itemName?: string;
  title?: string;
  description?: string;
  trigger?: ReactNode;

  /** Your delete request handler */
  onDelete: () => Promise<{
    success: boolean;
    message: string;
    redirectTo?: string;
  }>;

  deleteButton?: ShadcnButtonProps | DaisyButtonProps;
}

export default function DeleteDialog({
  itemName,
  title,
  description,
  trigger,
  onDelete,
  deleteButton = { library: "daisy", variant: "error" },
}: DeleteDialogProps) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await onDelete();

      if (!result.success) {
        setError(result.message);
        showToast({
          title: "Error",
          description: result.message,
          type: "error",
        });
        return;
      }

      setSuccess(result.message);
      showToast({
        title: "Deleted successfully",
        description: result.message,
        type: "success",
      });

      if (result.redirectTo) redirect(result.redirectTo);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || (
              <>
                Are you sure you want to delete <strong>{itemName}</strong>?
              </>
            )}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description ||
              "This action cannot be undone. The item will be permanently removed."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" className="cursor-pointer">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild type="button">
            <Button
              role={isPending ? "loading" : undefined}
              {...deleteButton}
              onClick={handleDelete}
              type="button"
            >
              Delete
              {isPending && (
                <LoaderCircle className="ms-2 animate-spin" size={12} />
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
