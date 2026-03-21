"use client";

import { UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  SchoolStaffTypes,
  StudentStatuses,
  TeacherTypes,
} from "@/lib/const/common-details-const";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import {
  type CreateJoinSchoolRequest,
  CreateJoinSchoolRequestSchema,
} from "@/lib/schema/school/school-join-school/create-join-school-request-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { ClassCombobox, type ComboboxItem } from "./class-combobox";

interface Props {
  auth: AuthContext;
}

const roleOptions = [
  { value: "Student", label: "Student" },
  { value: "Teacher", label: "Teacher" },
  { value: "Staff", label: "School Staff" },
];

export default function SendJoinSchoolRequestForm({ auth }: Props) {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await apiRequest<void, Paginated<Class>>(
          "get",
          `/school/classes`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
            realtime: "class",
          },
        );

        if (response.data?.data) {
          setClasses(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClasses();
  }, []);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    CreateJoinSchoolRequest,
    unknown
  >({
    schema: CreateJoinSchoolRequestSchema,
    formOptions: {
      defaultValues: {
        sent_by: auth.user.id,
        email: "",
        school_id: auth.school?.id,
        role: undefined,
        message: undefined,
        class_id: undefined,
        type: undefined,
      },
      mode: "onChange",
    },
    request: {
      method: "post",
      url: "/join-school-requests",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: "Request sent successfully ☺️",
    toastOnError: true,
    onSuccess: () => {
      form.reset();
    },
  });

  const selectedRole = form.watch("role");

  useEffect(() => {
    if (selectedRole !== "Staff") {
      form.resetField("type", { defaultValue: undefined });
    }
    if (selectedRole !== "Student") {
      form.resetField("class_id", { defaultValue: undefined });
    }

    form.trigger(["type", "class_id"]);
  }, [selectedRole, form]);

  const classItems: ComboboxItem[] = classes.map((classItem) => ({
    value: classItem.id || classItem._id || "",
    label: classItem.name,
    icon: UsersIcon,
  }));

  const joinSchoolTypes =
    selectedRole === "Staff"
      ? SchoolStaffTypes
      : selectedRole === "Student"
        ? StudentStatuses
        : TeacherTypes;

  const typeLabel =
    selectedRole === "Staff"
      ? "Staff Type"
      : selectedRole === "Student"
        ? "Student Status"
        : "Teacher Type";

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CommonFormField
          control={form.control}
          name="email"
          label="Email Address"
          required
          type="email"
          placeholder="example@email.com"
          disabled={isPending}
        />

        <CommonFormField
          control={form.control}
          name="role"
          label="Select Role"
          required
          fieldType="select"
          placeholder="Select joiner role"
          selectOptions={roleOptions}
          disabled={isPending}
        />

        {selectedRole && (
          <CommonFormField
            control={form.control}
            name="type"
            label={`${typeLabel} *`}
            required
            fieldType="select"
            placeholder={`Select ${selectedRole.toLowerCase()} type`}
            selectOptions={joinSchoolTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            disabled={isPending}
          />
        )}

        {selectedRole === "Student" && (
          <CommonFormField
            control={form.control}
            name="class_id"
            label="Select Class"
            required
            fieldType="custom"
            disabled={isPending}
            render={({ field, disabled }) => (
              <ClassCombobox
                items={classItems}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select student's class"
                searchPlaceholder="Search classes..."
                emptyMessage={
                  classes.length === 0
                    ? "No classes available."
                    : "No class found."
                }
                disabled={disabled || classes.length === 0}
              />
            )}
          />
        )}

        <CommonFormField
          control={form.control}
          name="message"
          label="Message (optional)"
          fieldType="textarea"
          placeholder="Write a short message for your request..."
          disabled={isPending}
        />

        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <Button
          disabled={isPending}
          className="w-full"
          library="daisy"
          variant="info"
          type="submit"
          role={isPending ? "loading" : undefined}
        >
          {isPending ? "Sending..." : "Send Request"}
        </Button>
      </form>
    </Form>
  );
}
