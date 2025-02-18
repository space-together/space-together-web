"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
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
import UseTheme from "@/context/theme/use-theme";
import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Class } from "../../../../../prisma/prisma/generated";
import { deleteClassAction } from "@/services/actions/class-action";

interface Props {
  classModel: Class;
}

const DeleteClassDialog = ({ classModel }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const action = await deleteClassAction(id);
      if (action.error) {
        setError(action.error);
      }

      if (action.success) {
        setSuccess(action.success);
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="xs">
          Delete
          {isPending && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={12}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-theme={UseTheme()} className="happy-card">
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center">
            Are you sure you want to delete Class <br />
            <strong className=" capitalize">{classModel.name}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the class
            account and the class will no longer be able to access the system
            again. 😔 Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(classModel.id)}
            className="btn-error"
          >
            Delete{" "}
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClassDialog;
