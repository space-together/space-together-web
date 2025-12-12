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
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useState, useTransition } from "react";
interface AddCurriculumInSchoolDialogProps {
  auth: AuthContext;
}

const AddCurriculumInSchoolDialog = ({
  auth,
}: AddCurriculumInSchoolDialogProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          library="daisy"
          className=" w-fit"
          role="create"
        >
          Add Education
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add curriculum</AlertDialogTitle>

          <AlertDialogDescription>
            Add new school curriculum
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" type="button">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              library="daisy"
              role={isPending ? "loading" : undefined}
              type="button"
              variant={"info"}
            >
              Add new education
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCurriculumInSchoolDialog;
