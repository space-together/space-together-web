"use client";
import {
  type Announcement,
  type AnnouncementBase,
  AnnouncementBaseSchema,
  type AnnouncementWithRelations,
} from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { ActorRef, Paginated } from "@/lib/schema/common-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { Student } from "@/lib/schema/student/student-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormError, FormSuccess } from "../form-message";
import { CommonFormField } from "./common-form-field";
import type { PickUserProps } from "./sign-to-input";

interface Props {
  auth: AuthContext;
  announcement?: AnnouncementWithRelations;
  lang: Locale;
}

const AnnouncementForm = ({ auth, announcement }: Props) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // ✅ Get realtime context to manually add items
  const { addItem, updateItem } =
    useRealtimeData<AnnouncementWithRelations>("announcement");

  // Extract existing mentions from announcement
  const existingStudentMentions = useMemo(() => {
    if (!announcement?.mentioned_users) return [];
    return announcement.mentioned_users
      .filter((user) => user.user_type === "STUDENT")
      .map((user) => ({
        value: user._id || user.id || "",
        label: user.name,
        image: user.image,
      }));
  }, [announcement]);

  const existingTeacherMentions = useMemo(() => {
    if (!announcement?.mentioned_users) return [];
    return announcement.mentioned_users
      .filter((user) => user.user_type === "TEACHER")
      .map((user) => ({
        value: user._id || user.id || "",
        label: user.name,
        image: user.image,
      }));
  }, [announcement]);

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
    onSuccess: (data) => {
      if (announcement) {
        updateItem(data as AnnouncementWithRelations);
      } else {
        addItem(data as AnnouncementWithRelations);
        form.reset();
      }
    },
  });

  const handleMentionChangeStudents = (value: PickUserProps[]) => {
    const currentMentions = form.getValues("mention") || [];

    // Remove all student mentions
    const nonStudentMentions = currentMentions.filter(
      (mention) => mention.role !== "STUDENT",
    );

    // Add new student mentions
    const studentMentions: ActorRef[] = value.map((user) => ({
      id: user.value,
      role: "STUDENT",
    }));

    form.setValue("mention", [...nonStudentMentions, ...studentMentions], {
      shouldDirty: true,
    });
  };

  const handleMentionChangeTeachers = (value: PickUserProps[]) => {
    const currentMentions = form.getValues("mention") || [];

    // Remove all teacher mentions
    const nonTeacherMentions = currentMentions.filter(
      (mention) => mention.role !== "TEACHER",
    );

    // Add new teacher mentions
    const teacherMentions: ActorRef[] = value.map((user) => ({
      id: user.value,
      role: "TEACHER",
    }));

    form.setValue("mention", [...nonTeacherMentions, ...teacherMentions], {
      shouldDirty: true,
    });
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
              defaultValue: existingStudentMentions,
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
              defaultValue: existingTeacherMentions,
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
