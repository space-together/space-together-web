"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { Class, ClassClassTeacherSettingsSchema } from "@/lib/schema/class/class-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import type { z } from "zod";

const ClassClassTeacherPermissionsSchema =
  ClassClassTeacherSettingsSchema.shape.allowed_actions;
type ClassClassTeacherPermissions = z.infer<
  typeof ClassClassTeacherPermissionsSchema
>;

interface ClassClassTeacherPermissionFormProps {
  cls: Class;
  auth: AuthContext
}

const ClassClassTeacherPermissionForm = ({ cls, auth }: ClassClassTeacherPermissionFormProps) => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ClassClassTeacherPermissions,
    Class
  >({
    schema: ClassClassTeacherPermissionsSchema,
    formOptions: {
      defaultValues: {
        can_edit_class_info: cls.settings?.class_teacher?.allowed_actions?.can_edit_class_info ?? false,
        can_add_students: cls.settings?.class_teacher?.allowed_actions?.can_add_students ?? false,
        can_remove_students: cls.settings?.class_teacher?.allowed_actions?.can_remove_students ?? false,
        can_manage_subjects: cls.settings?.class_teacher?.allowed_actions?.can_manage_subjects ?? false,
        can_manage_timetable: cls.settings?.class_teacher?.allowed_actions?.can_manage_timetable ?? false,
        can_assign_roles: cls.settings?.class_teacher?.allowed_actions?.can_assign_roles ?? false,
        can_send_parent_notifications: cls.settings?.class_teacher?.allowed_actions?.can_send_parent_notifications ?? false,
        can_add_teachers: cls.settings?.class_teacher?.allowed_actions?.can_add_teachers ?? false,
        can_approve_requests: cls.settings?.class_teacher?.allowed_actions?.can_approve_requests ?? false,
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
        class_teacher: {
          allowed_actions: values,
        },
      },
    }),

    onSuccessMessage: "Class teacher allowed actions updated successfully",
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
            label="Can edit class info"
            name="can_edit_class_info"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can add students"
            name="can_add_students"
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
          <CommonFormField
            label="Can approve requests"
            name="can_approve_requests"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can manage subjects"
            name="can_manage_subjects"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can manage timetable"
            name="can_manage_timetable"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can assign roles"
            name="can_assign_roles"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can send parent notifications"
            name="can_send_parent_notifications"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can add teachers"
            name="can_add_teachers"
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

export default ClassClassTeacherPermissionForm;
