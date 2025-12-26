"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  type Class,
  ClassStudentSettingsSchema,
} from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import type { z } from "zod";

const ClassStudentPermissionsSchema =
  ClassStudentSettingsSchema.shape.permissions;
type ClassStudentPermissions = z.infer<typeof ClassStudentPermissionsSchema>;

interface ClassStudentPermissionFormProps {
  cls: Class;
  auth: AuthContext;
}

const ClassStudentPermissionForm = ({
  cls,
  auth,
}: ClassStudentPermissionFormProps) => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ClassStudentPermissions,
    Class
  >({
    schema: ClassStudentPermissionsSchema,
    formOptions: {
      defaultValues: {
        can_chat: cls.settings?.students.permissions.can_chat || false,
        can_upload_homework:
          cls.settings?.students.permissions.can_upload_homework || true,
        can_comment: cls.settings?.students.permissions.can_comment || true,
        can_view_all_students:
          cls.settings?.students.permissions.can_view_all_students || true,
      },
    },
    request: {
      method: "patch",
      url: `/school/classes/${cls._id}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    /** 🔑 KEY PART */
    transform: (values) => ({
      settings: {
        students: {
          permissions: values,
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
            label="Can chat in class group"
            name="can_chat"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can comment"
            name="can_comment"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can upload class work"
            name="can_upload_homework"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can view all students"
            name="can_view_all_students"
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

export default ClassStudentPermissionForm;
