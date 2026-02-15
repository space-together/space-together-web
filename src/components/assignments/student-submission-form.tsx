"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
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

import {
    SubmissionBaseSchema,
    type Submission,
    type SubmissionBase,
} from "@/lib/schema/assignment/assignment-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  assignmentId: string;
  submission?: Submission;
  dueDate: string;
  isGraded?: boolean;
}

const StudentSubmissionForm = ({
  auth,
  assignmentId,
  submission,
  dueDate,
  isGraded,
}: Props) => {
  const { addItem, updateItem } = useRealtimeData<Submission>("submission");
  const isPastDue = new Date(dueDate) < new Date();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    SubmissionBase,
    Submission
  >({
    schema: SubmissionBaseSchema,
    formOptions: {
      defaultValues: {
        file_url: submission?.file_url || undefined,
        comment: submission?.comment || "",
      },
    },

    request: {
      method: submission ? "put" : "post",
      url: submission
        ? `/submissions/${submission._id || submission.id}`
        : `/assignments/${assignmentId}/submit`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: submission
      ? "Submission updated successfully"
      : "Assignment submitted successfully",

    toastOnError: true,
    onSuccess: (data) => {
      if (submission) {
        updateItem(data as Submission);
      } else {
        addItem(data as Submission);
      }
      form.reset();
    },
  });

  if (isGraded) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" library="daisy">
          {submission ? "Update Submission" : "Submit Assignment"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {submission ? "Update Submission" : "Submit Assignment"}
          </DialogTitle>
        </DialogHeader>

        {isPastDue && (
          <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
            ⚠️ This assignment is past due. Your submission will be marked as late.
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CommonFormField
              control={form.control}
              name="file_url"
              label="Upload File"
              fieldType="image"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="comment"
              label="Comment"
              fieldType="textarea"
              placeholder="Add any comments about your submission"
              disabled={isPending}
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
                disabled={isPending}
                role={isPending ? "loading" : undefined}
              >
                {submission ? "Update" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentSubmissionForm;
