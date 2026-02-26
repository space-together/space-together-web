"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { GenderDetails, Relationships } from "@/lib/const/common-details-const";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { GenderSchema } from "@/lib/schema/common-details-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Parent } from "@/lib/schema/parent/parent-schema";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ParentStatusSchema } from "../../../../lib/schema/common-details-schema";

const ParentBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  image: z.string().optional(),
  gender: GenderSchema.optional(),
  relationship: z.string().optional(),
  occupation: z.string().optional(),
  national_id: z.string().optional(),
  student_ids: z.array(z.string()).optional(),
  status: ParentStatusSchema.optional(),
  is_active: z.boolean().default(true),
});

type ParentBase = z.infer<typeof ParentBaseSchema>;

interface Props {
  auth: AuthContext;
  parent?: Parent;
  isSchool?: boolean;
}

const ParentForm = ({ auth, parent, isSchool }: Props) => {
  const [students, setStudents] = useState<StudentWithRelations[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const { addItem, updateItem } = useRealtimeData<Parent>("parent");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await apiRequest<void, Paginated<StudentWithRelations>>(
          "get",
          "/school/students/others",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (res?.data?.data) {
          setStudents(res?.data?.data);
        }
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchStudents();
  }, [auth]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ParentBase,
    Parent
  >({
    schema: ParentBaseSchema,
    formOptions: {
      defaultValues: {
        name: parent?.name ?? "",
        email: parent?.email ?? "",
        phone: parent?.phone ?? "",
        image: parent?.image ?? undefined,
        gender: parent?.gender ?? undefined,
        relationship: parent?.relationship ?? undefined,
        occupation: parent?.occupation ?? undefined,
        national_id: parent?.national_id ?? undefined,
        student_ids: parent?.student_ids ?? [],
        status: parent?.status ?? "ACTIVE",
        is_active: parent?.is_active ?? true,
      },
    },

    transform: (values) => ({
      ...values,
      school_id: isSchool ? auth.school?.id : undefined,
      user_id: auth.user.id,
    }),

    request: {
      method: parent ? "put" : "post",
      url:
        parent && isSchool
          ? `/school/parents/${parent._id || parent.id}`
          : isSchool
            ? "/school/parents"
            : parent
              ? `/parents/${parent._id || parent.id}`
              : "/parents",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: parent
      ? "Parent updated successfully"
      : "Parent created successfully",

    toastOnError: true,
    onError: (error, data) => {
      console.log("Parents 🫡:", data);
      console.error(error);
    },
    onSuccess: (data) => {
      if (parent) {
        updateItem(data as Parent);
      } else {
        addItem(data as Parent);
        form.reset();
      }
    },
  });

  const studentOptions = students.map((s) => ({
    value: String(s._id),
    label: s.name,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="Parent full name"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              required
              placeholder="example@parent.com"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="phone"
              label="Phone Number"
              fieldType="phone"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="national_id"
              label="National ID"
              placeholder="National ID number"
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
              name="relationship"
              label="Relationship"
              fieldType="select"
              placeholder="Select relationship"
              selectOptions={Relationships.map((r) => ({
                value: r,
                label: r.replace(/([A-Z])/g, " $1").trim(),
              }))}
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Parent's occupation"
              disabled={isPending}
            />

            {students.length > 0 ? (
              <CommonFormField
                control={form.control}
                name="student_ids"
                label="Connected Students"
                fieldType="multipleSelect"
                placeholder={
                  loadingOptions ? "Loading students..." : "Select students"
                }
                disabled={isPending || loadingOptions}
                selectOptions={studentOptions}
              />
            ) : (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <strong className="mr-1">No students available.</strong>
                  {isSchool && (
                    <span>Please add students in the in school</span>
                  )}
                </div>
              </div>
            )}

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
            {parent ? "Update Parent" : "Add Parent"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ParentForm;
