"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
    CreateExamSchema,
    ExamTypeSchema,
    type CreateExam,
    type Exam,
} from "@/lib/schema/academics/exam.schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface EducationYear {
  id: string;
  _id?: string;
  name: string;
  year_label: string;
}

interface Class {
  id: string;
  _id?: string;
  name: string;
}

interface ExamFormProps {
  auth: AuthContext;
  exam?: Exam;
  onSuccess?: () => void;
}

export default function ExamForm({ auth, exam, onSuccess }: ExamFormProps) {
  const [educationYears, setEducationYears] = useState<EducationYear[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [yearsRes, classesRes] = await Promise.all([
          apiRequest<void, Paginated<EducationYear>>(
            "get",
            "/school/education-years",
            undefined,
            {
              token: auth.token,
              schoolToken: auth.schoolToken,
            },
          ),
          apiRequest<void, Paginated<Class>>(
            "get",
            "/school/classes",
            undefined,
            {
              token: auth.token,
              schoolToken: auth.schoolToken,
            },
          ),
        ]);

        if (yearsRes?.data?.data) {
          setEducationYears(yearsRes.data.data);
        }
        if (classesRes?.data?.data) {
          setClasses(classesRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch options", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    CreateExam,
    Exam
  >({
    schema: CreateExamSchema,
    formOptions: {
      defaultValues: {
        education_year_id: exam?.education_year_id ?? "",
        term_id: exam?.term_id ?? "",
        class_id: exam?.class_id ?? "",
        name: exam?.name ?? "",
        description: exam?.description ?? "",
        exam_type: exam?.exam_type ?? "Midterm",
        start_date: exam?.start_date ?? new Date().toISOString(),
        end_date: exam?.end_date ?? new Date().toISOString(),
      },
    },

    request: {
      method: exam ? "put" : "post",
      url: exam ? `/api/exams/${exam.id}` : "/api/exams",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: exam
      ? "Exam updated successfully"
      : "Exam created successfully",

    toastOnError: true,
    onSuccess: (data) => {
      if (!exam) {
        form.reset();
      }
      onSuccess?.();
    },
  });

  const examTypeOptions = ExamTypeSchema.options.map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="name"
              label="Exam Name"
              required
              placeholder="Term 1 Exam"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="exam_type"
              label="Exam Type"
              fieldType="searchSelect"
              required
              placeholder="Select exam type"
              disabled={isPending}
              selectOptions={examTypeOptions}
            />

            <CommonFormField
              control={form.control}
              name="education_year_id"
              label="Education Year"
              fieldType="searchSelect"
              required
              placeholder={
                loadingOptions
                  ? "Loading education years..."
                  : "Select education year"
              }
              disabled={isPending || loadingOptions}
              selectOptions={educationYears.map((year) => ({
                value: String(year.id ?? year._id),
                label: `${year.name} (${year.year_label})`,
              }))}
            />

            <CommonFormField
              control={form.control}
              name="class_id"
              label="Class (Optional)"
              fieldType="searchSelect"
              placeholder={
                loadingOptions ? "Loading classes..." : "Select a class"
              }
              disabled={isPending || loadingOptions}
              selectOptions={classes.map((cls) => ({
                value: String(cls.id ?? cls._id),
                label: cls.name,
              }))}
            />
          </div>

          {/* Right column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="start_date"
              label="Start Date"
              type="datetime-local"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="end_date"
              label="End Date"
              type="datetime-local"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="term_id"
              label="Term ID (Optional)"
              placeholder="e.g., term_1"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="description"
              label="Description (Optional)"
              fieldType="textarea"
              placeholder="Exam description..."
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
            {exam ? "Update Exam" : "Create Exam"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
