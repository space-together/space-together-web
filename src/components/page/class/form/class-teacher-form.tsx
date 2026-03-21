"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";

import {
  addOrUpdateClassTeacherSchema,
  type Class,
  type addOrUpdateClassTeacher,
} from "@/lib/schema/class/class-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Teacher, TeacherBase } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  teacher?: Teacher;
  cls?: Class;
}

const ClassTeacherForm = ({ auth, teacher, cls }: Props) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const { showToast } = useToast();

  // -------------------------------------
  // Fetch options
  // -------------------------------------
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const teacherRequest = teacher
          ? Promise.resolve({
              data: {
                data: [],
                total: 0,
                total_pages: 0,
                current_page: 1,
              },
            })
          : apiRequest<void, Paginated<Teacher>>(
              "get",
              "/school/teachers",
              undefined,
              {
                token: auth.token,
                schoolToken: auth.schoolToken,
              },
            );

        const classRequest = apiRequest<void, Paginated<Class>>(
          "get",
          "/school/classes",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        const [teachersRes, classesRes] = await Promise.all([
          teacher ? { data: { data: [] } } : teacherRequest,
          cls ? { data: { data: [] } } : classRequest,
        ]);

        if (teachersRes.data) {
          // const activeTeachers = teachersRes.data.filter((t) => !t.is_active);
          // setTeachers(activeTeachers);
          setTeachers(teachersRes.data.data);
        }

        if (classesRes?.data?.data) {
          setClasses(classesRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch options:", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth, teacher]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    addOrUpdateClassTeacher,
    TeacherBase
  >({
    schema: addOrUpdateClassTeacherSchema,
    formOptions: {
      defaultValues: {
        class_id: cls ? cls?._id || cls.id : undefined,
        teacher_id: teacher ? teacher?._id || teacher?.id : undefined,
      },
      mode: "onChange",
    },
    request: {
      method: "post",
      url: (values) => {
        const class_id = cls?._id || values.class_id;
        const teacher_id = teacher?._id || values.teacher_id;
        return `/school/classes/${class_id}/teachers/${teacher_id}/assign`;
      },
      apiRequest: { token: auth.token, schoolToken: auth.schoolToken },
      omitBody: true,
    },
    onSuccessMessage: teacher
      ? "Teacher updated successfully!"
      : "Teacher assigned successfully!",
    toastOnError: true,
    onSuccess: (data) => {
      showToast({
        title: teacher ? "Teacher Updated" : "Teacher Assigned",
        description: data.name,
        type: "success",
      });
      if (!teacher) form.reset();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Class Selector */}
        {!cls && (
          <CommonFormField
            name="class_id"
            control={form.control}
            label="Choose Class"
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

        {!teacher && (
          <CommonFormField
            name="teacher_id"
            control={form.control}
            label="Choose Teacher"
            fieldType="searchSelect"
            placeholder={
              loadingOptions ? "Loading teachers..." : "Select a teacher"
            }
            disabled={isPending || loadingOptions}
            selectOptions={teachers.map((t) => ({
              value: String(t.id ?? t._id),
              label: t.name,
            }))}
          />
        )}

        {/* Feedback Messages */}
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
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
            library="daisy"
          >
            Add teacher
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ClassTeacherForm;
