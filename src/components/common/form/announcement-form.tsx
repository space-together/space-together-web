"use client";
import {
  AnnouncementBaseSchema,
  type Announcement,
  type AnnouncementBase,
} from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import { AllFormErrors } from "@/components/test/form-testing";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { Locale } from "@/i18n";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { useRealtimeImproved } from "@/lib/hooks/useRealtimeImproved";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Student } from "@/lib/schema/student/student-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";
import { FormError, FormSuccess } from "../form-message";
import { CommonFormField } from "./common-form-field";

interface Props {
  auth: AuthContext;
  announcement?: Announcement;
  lang: Locale;
}

const AnnouncementForm = ({ auth, announcement }: Props) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const students = await apiRequest<void, Paginated<Student>>(
        "get",
        `/school/students?limit=${LIMIT`,
        undefined,
        { token: auth.token, schoolToken: auth.schoolToken },
      );
      if (students.data) {
        setStudents(students.data.data);
      }
    };

    fetchData();
  }, []);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    AnnouncementBase,
    Announcement
  >({
    schema: AnnouncementBaseSchema,

    formOptions: {
      defaultValues: {
        published: announcement?.published ?? {
          id: auth.school?.member?._id || auth.user.id,
          role: auth.user.role
            ? auth.user.role
            : auth.school?.member?.user_type === "USER"
              ? "SCHOOLSTAFF"
              : auth.school?.member?.user_type,
        },
        content: announcement?.content ?? undefined,
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

    onSuccessMessage: announcement
      ? "Announcement updated successfully"
      : "Announcement created successfully",

    toastOnError
  : true,

    onSuccess: (data) =>
  useRealtimeImproved("announcement", data);
  if (!announcement) form.reset();
  ,

    onError: (err, values) =>
  console.error("Ann form error:", err, values);
  ,
};
)

return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <CommonFormField
          control={form.control}
          name="mention"
          label="All students"
          fieldType="sign-to"
          placeholder="Search students..."
          signToInput={{
            name: "All students",
            title: "Announce to students",
          }}
        />
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
          {/*<DialogClose asChild>
          </DialogClose>*/}
          <Button
            type="button"
            variant="info"
            disabled={
              isPending ||
              (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
            }
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
            size={"sm"}
            library="daisy"
          >
            Add announcement
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default AnnouncementForm;
