"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";

import { SchoolStaffTypeDetails } from "@/lib/const/common-details-const";

import {
  SchoolStaffBaseSchema,
  type SchoolStaff,
  type SchoolStaffBase,
} from "@/lib/schema/school-staff/school-staff-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  staff?: SchoolStaff;
  isSchool?: boolean;
}

const SchoolStaffForm = ({ auth, staff, isSchool = true }: Props) => {
  const { addItem, updateItem } = useRealtimeData<SchoolStaff>("school_staff");

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    SchoolStaffBase,
    SchoolStaff
  >({
    schema: SchoolStaffBaseSchema,

    formOptions: {
      defaultValues: {
        name: staff?.name ?? "",
        email: staff?.email ?? "",
        image: staff?.image ?? undefined,
        type: staff?.type ?? "Director",
        is_active: staff?.is_active ?? true,
        school_id: staff?.school_id ?? auth.school?.id,
        creator_id: staff?.creator_id ?? auth.user.id,
      },
    },

    transform: (values) => ({
      ...values,
      creator_id: auth.user.id,
      school_id: isSchool ? auth.school?.id : undefined,
    }),

    request: {
      method: staff ? "put" : "post",
      url:
        staff && isSchool
          ? `/school/school-staff/${staff._id}`
          : isSchool
            ? "/school/school-staff"
            : staff
              ? `/school-staff/${staff._id}`
              : "/school-staff",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: staff
      ? "Staff member updated successfully"
      : "Staff member created successfully",

    toastOnError: true,

    onSuccess: (data, value) => {
      console.log("😡😡", value);
      if (staff) {
        updateItem(data as SchoolStaff);
      } else {
        addItem(data as SchoolStaff);
        form.reset();
      }
    },
  });

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
              placeholder="Staff full name"
              disabled={isPending}
            />

            {!staff?.user_id && (
              <CommonFormField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="example@school.com"
                disabled={isPending}
              />
            )}
          </div>

          {/* Right column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="type"
              label="Staff Role"
              fieldType="radio-input"
              items={SchoolStaffTypeDetails}
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
            {staff ? "Update Staff" : "Add Staff"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SchoolStaffForm;
