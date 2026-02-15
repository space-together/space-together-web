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
  GradeSubmissionSchema,
  type GradeSubmission,
  type Submission,
} from "@/lib/schema/assignment/assignment-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  assignmentId: string;
  submission: Submission;
  maxScore: number;
}

const GradeDialog = ({ auth, assignmentId, submission, maxScore }: Props) => {
  const { updateItem } = useRealtimeData<Submission>("submission");

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    GradeSubmission,
    Submission
  >({
    schema: GradeSubmissionSchema.refine(
      (data) => data.score <= maxScore,
      {
        message: `Score cannot exceed max score of ${maxScore}`,
        path: ["score"],
      }
    ),
    formOptions: {
      defaultValues: {
        score: submission.score || 0,
        feedback: submission.feedback || "",
        feedback_file: submission.feedback_file_url || undefined,
      },
    },

    request: {
      method: "put",
      url: `/assignments/${assignmentId}/grade/${submission._id || submission.id}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: "Submission graded successfully",
    toastOnError: true,
    onSuccess: (data) => {
      updateItem(data as Submission);
      form.reset();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" library="daisy">
          {submission.score !== undefined ? "Update Grade" : "Grade"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Grade Submission</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CommonFormField
              control={form.control}
              name="score"
              label={`Score (Max: ${maxScore})`}
              required
              type="number"
              placeholder="Enter score"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="feedback"
              label="Feedback"
              fieldType="textarea"
              placeholder="Provide feedback to the student"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="feedback_file"
              label="Feedback File"
              fieldType="image"
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
                Submit Grade
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GradeDialog;
