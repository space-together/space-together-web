"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import {
  AssignmentBaseSchema,
  type Assignment,
  type AssignmentBase,
} from "@/lib/schema/assignment/assignment-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Subject } from "@/lib/schema/subject/subject-schema";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
  assignment?: Assignment;
  classId?: string;
  subjectId?: string;
}

const AssignmentForm = ({ auth, assignment, classId, subjectId }: Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const { addItem, updateItem } = useRealtimeData<Assignment>("assignment");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [classesRes, subjectsRes] = await Promise.all([
          classId
            ? Promise.resolve(null)
            : apiRequest<void, Paginated<Class>>(
                "get",
                "/school/classes",
                undefined,
                {
                  token: auth.token,
                  schoolToken: auth.schoolToken,
                },
              ),
          subjectId
            ? Promise.resolve(null)
            : apiRequest<void, Paginated<Subject>>(
                "get",
                "/school/subjects",
                undefined,
                {
                  token: auth.token,
                  schoolToken: auth.schoolToken,
                },
              ),
        ]);

        if (classesRes?.data?.data) {
          setClasses(classesRes.data.data);
        }
        if (subjectsRes?.data?.data) {
          setSubjects(subjectsRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch options", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth, classId, subjectId]);

  const statusOptions = [
    { value: "Draft", label: "Draft" },
    { value: "Published", label: "Published" },
    { value: "Archived", label: "Archived" },
  ];

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    AssignmentBase,
    Assignment
  >({
    schema: AssignmentBaseSchema,
    formOptions: {
      defaultValues: {
        class_id: classId || assignment?.class_id || "",
        subject_id: subjectId || assignment?.subject_id || "",
        title: assignment?.title || "",
        description: assignment?.description || "",
        instructions: assignment?.instructions || "",
        due_date: assignment?.due_date || "",
        max_score: assignment?.max_score || 100,
        allow_late_submission: assignment?.allow_late_submission || false,
        attachment_url: assignment?.attachment_url || undefined,
        status: assignment?.status || "Published",
      },
    },

    request: {
      method: assignment ? "put" : "post",
      url: assignment ? `/assignments/${assignment._id || assignment.id}` : "/assignments",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: assignment
      ? "Assignment updated successfully"
      : "Assignment created successfully",

    toastOnError: true,
    onSuccess: (data) => {
      if (assignment) {
        updateItem(data as Assignment);
      } else {
        addItem(data as Assignment);
        form.reset();
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="title"
              label="Title"
              required
              placeholder="Assignment title"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              fieldType="textarea"
              placeholder="Brief description"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="instructions"
              label="Instructions"
              fieldType="textarea"
              placeholder="Detailed instructions for students"
              disabled={isPending}
            />

            {!classId && (
              <CommonFormField
                control={form.control}
                name="class_id"
                label="Class"
                required
                fieldType="searchSelect"
                placeholder={loadingOptions ? "Loading..." : "Select a class"}
                disabled={isPending || loadingOptions}
                selectOptions={classes.map((c) => ({
                  value: String(c.id ?? c._id),
                  label: c.name,
                }))}
              />
            )}

            {!subjectId && (
              <CommonFormField
                control={form.control}
                name="subject_id"
                label="Subject"
                required
                fieldType="searchSelect"
                placeholder={loadingOptions ? "Loading..." : "Select a subject"}
                disabled={isPending || loadingOptions}
                selectOptions={subjects.map((s) => ({
                  value: String(s.id ?? s._id),
                  label: s.name,
                }))}
              />
            )}
          </div>

          {/* Right column */}
          <div className="flex w-full flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="due_date"
              label="Due Date"
              required
              type="datetime-local"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="max_score"
              label="Max Score"
              required
              type="number"
              placeholder="100"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="status"
              label="Status"
              fieldType="searchSelect"
              selectOptions={statusOptions}
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="allow_late_submission"
              label="Allow Late Submission"
              fieldType="checkbox"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="attachment_url"
              label="Attachment"
              fieldType="image" // TODO: make file input type
              disabled={isPending}
            />
          </div>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

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
            {assignment ? "Update Assignment" : "Create Assignment"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AssignmentForm;
