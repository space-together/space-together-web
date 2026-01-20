"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  Class,
  ClassTeachersSettingsSchema,
} from "@/lib/schema/class/class-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import type { z } from "zod";

const ClassTeacherPermissionsSchema =
  ClassTeachersSettingsSchema.shape.permissions;
type ClassTeacherPermissions = z.infer<typeof ClassTeacherPermissionsSchema>;

interface ClassTeacherPermissionFormProps {
  cls: Class;
  auth: AuthContext;
}

const ClassTeacherPermissionForm = ({
  cls,
  auth,
}: ClassTeacherPermissionFormProps) => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ClassTeacherPermissions,
    Class
  >({
    schema: ClassTeacherPermissionsSchema,
    formOptions: {
      defaultValues: {
        can_edit_marks: cls.settings?.teachers?.permissions?.can_edit_marks,
        can_take_attendance:
          cls.settings?.teachers?.permissions?.can_take_attendance,
        can_remove_students:
          cls.settings?.teachers?.permissions?.can_remove_students,
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
        teachers: {
          permissions: values,
        },
      },
    }),

    onSuccessMessage: "Teacher permissions updated successfully",
    toastOnError: true,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4"
      >
        <div className=" flex flex-col gap-4">
          <CommonFormField
            label="Can edit marks"
            name="can_edit_marks"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can take attendance"
            name="can_take_attendance"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can remove students"
            name="can_remove_students"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
        </div>
        {(error || success) && (
          <div className=" flex flex-col">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        )}
        <Button
          variant={"info"}
          disabled={isPending}
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

export default ClassTeacherPermissionForm;
