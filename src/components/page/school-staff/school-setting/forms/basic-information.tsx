"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { schoolMembers, schoolTypes } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
  type BasicInformationDto,
  BasicInformationSchema,
} from "./schema/basic-information";

interface BasicInformationFormProps {
  initialData: School;
  auth: AuthContext;
}

export const BasicInformationForm = ({
  initialData,
  auth,
}: BasicInformationFormProps) => {
  const { showToast } = useToast();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    BasicInformationDto,
    School
  >({
    schema: BasicInformationSchema,
    formOptions: {
      defaultValues: {
        logo: initialData?.logo || undefined,
        name: initialData?.name || undefined,
        username: initialData?.username || undefined,
        description: initialData?.description || undefined,
        school_type: initialData?.school_type || undefined,
        school_members: initialData?.school_members || undefined,
      },
    },
    request: {
      method: "put",
      url: `/schools/${initialData._id}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: "School basic information updated successfully",
    toastOnError: true,
    onSuccess: () => {
      showToast({
        type: "success",
        title: "To update school basic information success!",
        description: "You have been update school basic information",
        duration: 3000,
      });
    },
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="mb-4 pb-2 text-xl font-semibold">Basic Information</h3>
          <div className="flex w-full space-x-6">
            <div className="flex flex-col space-y-4">
              <CommonFormField
                control={form.control}
                name="name"
                label="School Name"
                placeholder="e.g., Green Hills Academy"
                className="w-120"
                description="Full legal or commonly used name of your school."
              />
              <CommonFormField
                control={form.control}
                name="username"
                label="School Username"
                placeholder="e.g., greenhills"
                className="w-120"
                description="Unique identifier for the school. Used in URLs or login; usually cannot be changed later."
              />

              <CommonFormField
                control={form.control}
                name="school_type"
                label="School Type"
                fieldType="select"
                placeholder="Select school type"
                className="w-40"
                selectOptions={schoolTypes.map((type) => ({
                  value: type,
                  label: type,
                }))}
                description="Defines the educational level or specialization of your institution (e.g., Primary, Secondary, Vocational)."
              />

              <CommonFormField
                control={form.control}
                name="school_members"
                label="Student Body"
                fieldType="select"
                placeholder="Select student body type"
                className="w-40"
                selectOptions={schoolMembers.map((type) => ({
                  value: type,
                  label: type,
                }))}
                description="Gender composition of students your school enrolls (e.g., Co-educational, Boys only, Girls only)."
              />
              <CommonFormField
                control={form.control}
                name="description"
                label="Description"
                fieldType="textarea"
                placeholder="Tell us a little bit about the school"
                className="min-h-[100px] w-120 resize-y"
                description="Provide an overview including history, values, mission, or key achievements."
              />
            </div>
            <CommonFormField
              control={form.control}
              name="logo"
              label="School Logo"
              placeholder="Upload school logo"
              required
              disabled={isPending}
              fieldType="avatar"
              avatarProps={{
                avatarProps: { classname: "object-contain", size: "3xl" },
              }}
              description="Upload a school logo"
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full md:w-auto"
            library={"daisy"}
            variant={"info"}
            disabled={
              isPending ||
              (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
            }
          >
            {isPending ? "Saving..." : "Save Basic Information"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
