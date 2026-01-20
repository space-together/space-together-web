"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";

import {
  GenderDetails,
  StudentStatusDetails,
} from "@/lib/const/common-details-const";

import type { Class } from "@/lib/schema/class/class-schema";
import {
  StudentBaseSchema,
  type Student,
  type StudentBase,
} from "@/lib/schema/student/student-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
  student?: Student;
  isSchool?: boolean;
  cls?: Class;
}

const StudentForm = ({ auth, student, isSchool, cls }: Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const { addItem, updateItem } = useRealtimeData<Student>("student");

  useEffect(() => {
    if (cls) {
      setLoadingOptions(false);
      return;
    }

    const fetchClasses = async () => {
      try {
        const res = await apiRequest<void, Paginated<Class>>(
          "get",
          "/school/classes",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (res?.data?.data) {
          setClasses(res?.data?.data);
        }
      } catch (err) {
        console.error("Failed to fetch classes", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchClasses();
  }, [auth, cls]);

  // -------------------------------------
  // Form logic (same pattern as CreateSchoolForm)
  // -------------------------------------
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    StudentBase,
    Student
  >({
    schema: StudentBaseSchema,
    formOptions: {
      defaultValues: {
        name: student?.name ?? "",
        email: student?.email ?? "",
        phone: student?.phone ?? "",
        image: student?.image ?? undefined,
        gender: student?.gender ?? undefined,
        date_of_birth: student?.date_of_birth ?? undefined,
        class_id: student?.class_id ?? undefined,
        registration_number: student?.registration_number ?? undefined,
        admission_year: student?.admission_year ?? undefined,
        status: student?.status ?? "Active",
        is_active: student?.is_active ?? true,
        tags: student?.tags ?? [],
        creator_id: auth.user.id,
        school_id: isSchool ? auth.school?.id : undefined,
      },
    },

    transform: (values) => ({
      ...values,
      admission_year: values.admission_year
        ? Number(values.admission_year)
        : undefined,
      school_id: isSchool ? auth.school?.id : undefined,
    }),

    request: {
      method: student ? "put" : "post",
      url:
        student && isSchool
          ? `/school/students/${student._id || student.id}`
          : isSchool
            ? "/school/students"
            : student
              ? `/students/${student._id || student.id}`
              : "/students",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: student
      ? "Student updated successfully"
      : "Student created successfully",

    toastOnError: true,
    onSuccess: (data) => {
      if (student) {
        updateItem(data as Student);
      } else {
        addItem(data as Student);
        form.reset();
      }
    },
  });

  // -------------------------------------
  // Render
  // -------------------------------------
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
              placeholder="Student full name"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="example@student.com"
              disabled={isPending}
            />

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
              name="status"
              label="Status"
              fieldType="radio-input"
              items={StudentStatusDetails}
              className=" grid-cols-2"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="registration_number"
              label="Registration Number"
              placeholder="Registration number"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="admission_year"
              label="Admission Year"
              type="number"
              placeholder="e.g. 2024"
              disabled={isPending}
            />

            {!cls && (
              <CommonFormField
                control={form.control}
                name="class_id"
                label="Class"
                fieldType="searchSelect"
                placeholder={
                  loadingOptions ? "Loading classes..." : "Select a class"
                }
                disabled={isPending || loadingOptions}
                selectOptions={classes.map((c) => ({
                  value: String(c.id ?? c._id),
                  label: c.name,
                }))}
              />
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
            {student ? "Update Student" : "Add Student"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default StudentForm;
