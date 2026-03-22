"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  type NewStudentForm,
  newStudentFormSchema,
} from "@/lib/schema/table-forms/forms";
import { getAccessToken } from "@/lib/utils/client-auth";

const AddStudentInSchoolForm = () => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    NewStudentForm,
    unknown
  >({
    schema: newStudentFormSchema,
    formOptions: {
      defaultValues: {
        email: "",
        classId: "",
      },
    },
    request: {
      method: "post",
      url: "/school/students/invite",
      apiRequest: {
        token: getAccessToken() ?? "",
      },
    },
    onSuccessMessage: "Invitation sent",
    toastOnError: true,
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <CommonFormField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email address"
            disabled={isPending}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />

        <AlertDialogFooter>
          <Button
            type="submit"
            library="daisy"
            variant={"info"}
            disabled={isPending}
            role={isPending ? "loading" : undefined}
          >
            Add Student
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default AddStudentInSchoolForm;
