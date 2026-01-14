"use client";
import {
  AnnouncementBaseSchema,
  type Announcement,
  type AnnouncementBase,
  type Mention,
} from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import { AllFormErrors } from "@/components/test/form-testing";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { Student } from "@/lib/schema/student/student-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useState } from "react";
import { FormError, FormSuccess } from "../form-message";
import { CommonFormField } from "./common-form-field";
import type { PickUserProps } from "./sign-to-input";

interface Props {
  auth: AuthContext;
  announcement?: Announcement;
  lang: Locale;
}

const AnnouncementForm = ({ auth, announcement }: Props) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchStudents = useCallback(
    async (query: string = "") => {
      try {
        const response = await apiRequest<void, Paginated<Student>>(
          "get",
          `/school/students?limit=${LIMIT}&filter=${query}`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        );
        if (response.data) {
          setStudents(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    },
    [auth.token, auth.schoolToken],
  );

  // Initial load
  useEffect(() => {
    fetchStudents("");
  }, [fetchStudents]);

  const fetchTeachers = useCallback(
    async (query: string = "") => {
      try {
        const response = await apiRequest<void, Paginated<Teacher>>(
          "get",
          `/school/teachers?limit=${LIMIT}&filter=${query}`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        );
        if (response.data) {
          setTeachers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch teachers", error);
      }
    },
    [auth.token, auth.schoolToken],
  );

  // Initial load
  useEffect(() => {
    fetchTeachers("");
  }, [fetchTeachers]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    AnnouncementBase,
    Announcement
  >({
    schema: AnnouncementBaseSchema,
    formOptions: {
      defaultValues: {
        published: announcement?.published ?? {
          id: auth.school?.member?._id || auth.user.id,
          role: auth.user.role ?? "SCHOOLSTAFF",
        },
        content: announcement?.content ?? "",
        classes_ids: announcement?.classes_ids ?? [],
        mention: announcement?.mention ?? [],
      },
    },
    request: {
      method: announcement ? "put" : "post",
      url: `/school/announcements${announcement ? `/${announcement._id}` : ""}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: announcement ? "Updated!" : "Created!",
    toastOnError: true,
    onSuccess: () => {
      if (!announcement) form.reset();
    },
  });

  const handleMentionChangeStudents = (value: PickUserProps[]) => {
    const mentions: Mention[] = value.map((user) => ({
      id: user.value,
      role: "STUDENT",
    }));

    form.setValue("mention", mentions);
  };

  const handleMentionChangeTeachers = (value: PickUserProps[]) => {
    const mentions: Mention[] = value.map((user) => ({
      id: user.value,
      role: "TEACHER",
    }));

    form.setValue("mention", mentions);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <div className=" flex flex-wrap gap-4">
          <CommonFormField
            control={form.control}
            name="mention"
            label="All students"
            fieldType="sign-to"
            placeholder="Search students name or email..."
            signToInput={{
              name: "All students",
              title: "Announce to students",
              onChange: handleMentionChangeStudents,
              onSearch: fetchStudents,
              users: students.map((student) => ({
                value: student._id || student.id || "",
                label: student.name,
                image: student.image,
              })),
            }}
          />
          <CommonFormField
            control={form.control}
            name="mention"
            label="All teachers"
            fieldType="sign-to"
            placeholder="Search teachers name or email..."
            signToInput={{
              name: "All teachers",
              title: "Announce to teachers",
              onChange: handleMentionChangeTeachers,
              onSearch: fetchTeachers,
              users: teachers.map((teacher) => ({
                value: teacher._id || teacher.id || "",
                label: teacher.name,
                image: teacher.image,
              })),
            }}
          />
        </div>

        <CommonFormField
          control={form.control}
          label="Announcement"
          name="content"
          placeholder="Add announcement..."
          fieldType="message"
          messageInputProps={{
            enabledTools: ["emoji", "files", "metion", "toolbar"],
          }}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <AllFormErrors errors={form.formState.errors} />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              library="daisy"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="info"
              disabled={isPending || !form.formState.isDirty}
              className="w-full sm:w-auto"
              role={isPending ? "loading" : undefined}
              size={"sm"}
              library="daisy"
            >
              {announcement ? "Update announcement" : "Add announcement"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AnnouncementForm;
