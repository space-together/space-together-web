"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  classStudentClassWorkSchema,
  type Class,
  type ClassStudentClassWork,
} from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface ClassClassworkSettingFormProps {
  cls: Class;
  auth: AuthContext;
}

const ClassClassworkSettingForm = ({
  cls,
  auth,
}: ClassClassworkSettingFormProps) => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ClassStudentClassWork,
    Class
  >({
    schema: classStudentClassWorkSchema,
    formOptions: {
      defaultValues: {
        allow_resubmission:
          cls.settings?.students?.classwork_rules?.allow_resubmission,
        max_late_days: cls.settings?.students?.classwork_rules?.max_late_days,
      },
    },
    request: {
      method: "put",
      url: `/school/classes/${cls._id}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    transform: (values) => ({
      settings: {
        students: {
          classwork_rules: values,
        },
      },
    }),

    onSuccessMessage: "Student permissions updated successfully",
    toastOnError: true,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-8"
      >
        <div className=" flex flex-col gap-4">
          <CommonFormField
            label="Allow resubmission"
            name="allow_resubmission"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <div className=" w-30">
            <CommonFormField
              label="Max late days"
              name="max_late_days"
              type="number"
              fieldType="input"
              className=" w-full"
              inputProps={{
                numberMode: "day",
                numberProps: { minValue: 1, maxValue: 10 },
              }}
              control={form.control}
            />
          </div>
        </div>

        {(error || success) && (
          <div className=" flex flex-col">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        )}

        <Button
          variant={"info"}
          disabled={
            isPending ||
            (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
          }
          role={isPending ? "loading" : undefined}
          library="daisy"
          className=" w-fit"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default ClassClassworkSettingForm;
