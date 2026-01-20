"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";

import {
  GenderDetails,
  TeacherTypeDetails,
} from "@/lib/const/common-details-const";

import {
  TeacherBaseSchema,
  type Teacher,
  type TeacherBase,
} from "@/lib/schema/school/teacher-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";

interface Props {
  auth: AuthContext;
  teacher?: Teacher;
  isSchool?: boolean;
}

const TeacherForm = ({ auth, teacher, isSchool }: Props) => {
  const { addItem, updateItem } = useRealtimeData<Teacher>("teacher");

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    TeacherBase,
    Teacher
  >({
    schema: TeacherBaseSchema,

    formOptions: {
      defaultValues: {
        name: teacher?.name ?? "",
        email: teacher?.email ?? "",
        phone: teacher?.phone ?? "",
        image: teacher?.image ?? undefined,
        gender: teacher?.gender ?? undefined,
        type: teacher?.type ?? "Regular",
        class_ids: teacher?.class_ids ?? [],
        subject_ids: teacher?.subject_ids ?? [],
        tags: teacher?.tags ?? [],
        is_active: teacher?.is_active ?? true,
        creator_id: auth.user.id,
        school_id: isSchool ? auth.school?.id : undefined,
      },
    },

    transform: (values) => ({
      ...values,
      school_id: isSchool ? auth.school?.id : undefined,
    }),

    request: {
      method: teacher ? "put" : "post",
      url:
        teacher && isSchool
          ? `/school/teachers/${teacher._id || teacher.id}`
          : isSchool
            ? "/school/teachers"
            : teacher
              ? `/teachers/${teacher._id || teacher.id}`
              : "/teachers",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: teacher
      ? "Teacher updated successfully"
      : "Teacher created successfully",

    toastOnError: true,

    onSuccess: (data) => {
      if (teacher) {
        updateItem(data as Teacher);
      } else {
        addItem(data as Teacher);
        form.reset();
      }
    },
  });

  // -------------------------------------
  // Render
  // -------------------------------------
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="image"
              fieldType="avatar"
              label="Profile Image"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="name"
              label="Full Name"
              required
              placeholder="Teacher full name"
              disabled={isPending}
            />

            {!teacher?.user_id && (
              <CommonFormField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="example@school.com"
                disabled={isPending}
              />
            )}

            <CommonFormField
              control={form.control}
              name="phone"
              label="Phone Number"
              fieldType="phone"
              disabled={isPending}
            />
          </div>

          {/* Right column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="gender"
              label="Gender"
              fieldType="radio-input"
              items={GenderDetails}
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="type"
              label="Teacher Type"
              fieldType="radio-input"
              items={TeacherTypeDetails}
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="is_active"
              label="Active"
              fieldType="checkbox"
              disabled={isPending}
            />
          </div>
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 sm:justify-end">
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
            {teacher ? "Update Teacher" : "Add Teacher"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TeacherForm;
