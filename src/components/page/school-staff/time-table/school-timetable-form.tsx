"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { Weekday } from "@/lib/schema/common-details-schema";
import {
  SchoolTimetableSchema,
  type SchoolTimetable,
} from "@/lib/schema/school/school-timetable-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import type { SchoolTimetableEducationChoice } from "./school-timetable-choose-education";
import { DailyScheduleCard } from "./school-timetable-form-components";

/* -------------------------------------------------------------------------- */
/* Types & Schema                              */
/* -------------------------------------------------------------------------- */

// Omit system fields for the form
export const SchoolTimetableFormSchema = SchoolTimetableSchema.omit({
  id: true,
  _id: true,
  created_at: true,
  updated_at: true,
});

export type SchoolTimetableFormType = z.infer<typeof SchoolTimetableFormSchema>;

interface SchoolTimetableFormProps {
  auth: AuthContext;
  timetable?: SchoolTimetable;
  // If creating new, you likely pass these as props or hidden fields
  defaultSchoolId?: string;
  defaultAcademicYearId?: string;
  choice?: SchoolTimetableEducationChoice | null;
}

const SchoolTimetableForm = ({
  auth,
  timetable,
  defaultAcademicYearId,
}: SchoolTimetableFormProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  // 1. Generate default week if creating new
  const generateDefaultWeek = () => {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"] as Weekday[]; // Backend only generates Mon–Fri

    return weekdays.map((day) => ({
      day,
      is_school_day: true,
      school_start_time: "08:30",
      school_end_time: "17:00",
      study_start_time: "09:00",
      study_end_time: "17:00",

      breaks: [
        {
          title: "Morning Break",
          start_time: "10:20",
          end_time: "10:40",
          description: "Morning break",
        },
        {
          title: "Afternoon Break",
          start_time: "15:20",
          end_time: "15:40",
          description: "Afternoon break",
        },
      ],

      lunch: {
        title: "Lunch",
        start_time: "13:00",
        end_time: "14:00",
        description: "Time for lunch",
      },

      activities: [],
      special_type: "Normal",
    }));
  };

  const generateNewDay = (day: Weekday) => ({
    day,
    is_school_day: true,
    school_start_time: "08:30",
    school_end_time: "17:00",
    study_start_time: "09:00",
    study_end_time: "17:00",
    breaks: [],
    lunch: {
      title: "Lunch",
      start_time: "13:00",
      end_time: "14:00",
      description: "",
    },
    activities: [],
    special_type: "Normal",
  });

  const form = useForm<SchoolTimetableFormType>({
    resolver: zodResolver(SchoolTimetableFormSchema),
    defaultValues: {
      school_id: timetable?.school_id || auth?.school?.id,
      academic_year_id:
        timetable?.academic_year_id || defaultAcademicYearId || null,
      // @ts-expect-error - Validating complex nested arrays in default values can be tricky with Zod inference
      default_weekly_schedule:
        timetable?.default_weekly_schedule || generateDefaultWeek(),
      overrides: timetable?.overrides || [],
      events: timetable?.events || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "default_weekly_schedule",
  });

  const removeDay = (index: number) => {
    remove(index);
  };

  const onSubmit = (values: SchoolTimetableFormType) => {
    setError(undefined);
    setSuccess(undefined);

    console.log("Submitted values 😘😘:", values);

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden IDs */}
        <div className="hidden">
          <CommonFormField
            control={form.control}
            name="school_id"
            label="School ID"
          />
          <CommonFormField
            control={form.control}
            name="academic_year_id"
            label="Year ID"
          />
        </div>

        <div className="space-y-4">
          <h3 className="h6">Weekly Schedule Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure the standard schedule for each day of the week.
          </p>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="Mon"
          >
            {fields.map((field, index) => (
              <DailyScheduleCard
                key={field.id}
                control={form.control}
                index={index}
                dayName={field.day as string}
                removeDay={removeDay}
              />
            ))}
          </Accordion>
          {/* Add Day Button — shown only if < 7 days */}
          {fields.length < 7 && (
            <div className="flex justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const allDays: Weekday[] = [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                  ];

                  const used = fields.map((f) => f.day);
                  const nextDay = allDays.find((d) => !used.includes(d));
                  if (!nextDay) return;

                  append(generateNewDay(nextDay));
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Day
              </Button>
            </div>
          )}
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
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
            library="daisy"
          >
            {timetable ? "Update Timetable" : "Create Timetable"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SchoolTimetableForm;
