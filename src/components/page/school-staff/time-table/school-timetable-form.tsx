"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  SchoolTimetableSchema,
  type SchoolTimetable,
} from "@/lib/schema/school/school-timetable-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

interface SchoolTimetableFormProps {
  auth: AuthContext;
  timetable?: SchoolTimetable;
}

const SchoolTimetableFormSchema = SchoolTimetableSchema.omit({
  id: true,
  _id: true,
  created_at: true,
  updated_at: true,
});

type SchoolTimetableFormType = z.infer<typeof SchoolTimetableFormSchema>;

const SchoolTimetableForm = ({ auth, timetable }: SchoolTimetableFormProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const from = useForm<SchoolTimetableFormType>({
    resolver: zodResolver(SchoolTimetableFormSchema),
    defaultValues: {
      school_id: timetable?.school_id || "",
      academic_year_id: timetable?.academic_year_id || "",
      overrides: timetable?.overrides || [],
      events: timetable?.events || [],
    },
  });

  const onSubmit = (values: SchoolTimetableFormType) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      const req = await apiRequest<SchoolTimetableFormType, SchoolTimetable>(
        timetable ? "put" : "post",
        timetable
          ? `/school/timetables/${timetable._id}`
          : "/school/timetables",
        values,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );
      if (!req.data) {
        setError(`${req.message}`);
        showToast({
          title: "Error",
          description: `${req.message}`,
          type: "error",
        });
      } else {
        setSuccess("Timetable saved successfully");
      }
    });
  };

  return (
    <Form {...from}>
      <form onSubmit={from.handleSubmit(onSubmit)}>
        <div></div>
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
            {timetable ? "Update Timetable" : "Add Timetable"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SchoolTimetableForm;
