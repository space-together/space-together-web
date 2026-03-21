"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { Weekday } from "@/lib/schema/common-details-schema";
import {
  SchoolTimetableSchema,
  type DailySchoolSchedule,
  type SchoolTimetable,
} from "@/lib/schema/school/school-timetable-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { createOverrideFromDefault } from "@/lib/utils/school-timetable.override.utils";
import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import type { z } from "zod";
import type { SchoolTimetableEducationChoice } from "./school-timetable-choose-education";
import { DailyScheduleCard } from "./school-timetable-form-components";

/* -------------------------------------------------------------------------- */
/* Schema                                                                      */
/* -------------------------------------------------------------------------- */

export const SchoolTimetableFormSchema = SchoolTimetableSchema.omit({
  id: true,
  _id: true,
  created_at: true,
  updated_at: true,
});

export type SchoolTimetableFormType = z.infer<typeof SchoolTimetableFormSchema>;

interface Props {
  auth: AuthContext;
  timetable?: SchoolTimetable;
  defaultAcademicYearId?: string;
  choice?: SchoolTimetableEducationChoice | null;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function SchoolTimetableForm({
  auth,
  timetable,
  defaultAcademicYearId,
  choice,
}: Props) {
  // TODO: make get education and add they timetable
  const generateDefaultWeek = (): DailySchoolSchedule[] => {
    const days: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return days.map((day) => ({
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
      },
      activities: [],
      special_type: "Normal" as const,
    }));
  };

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    SchoolTimetableFormType,
    SchoolTimetable
  >({
    schema: SchoolTimetableFormSchema,
    formOptions: {
      defaultValues: {
        school_id: timetable?.school_id || auth.school?.id,
        academic_year_id:
          timetable?.academic_year_id || defaultAcademicYearId || null,

        default_weekly_schedule:
          timetable?.default_weekly_schedule || generateDefaultWeek(),

        overrides:
          timetable?.overrides ??
          (choice
            ? [
                createOverrideFromDefault(
                  timetable?.default_weekly_schedule ?? generateDefaultWeek(),
                  choice,
                ),
              ]
            : []),

        events: timetable?.events || [],
      },
    },
    request: {
      method: timetable ? "put" : "post",
      url: timetable
        ? `/school/timetables/${timetable._id}`
        : "/school/timetables",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: "Timetable saved successfully",
    toastOnError: true,
  });

  const defaultDays = useFieldArray({
    control: form.control,
    name: "default_weekly_schedule",
  });

  const overrides = useFieldArray({
    control: form.control,
    name: "overrides",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* DEFAULT SCHEDULE */}
        {!choice && (
          <Accordion type="single" collapsible>
            {defaultDays.fields.map((_, i) => (
              <DailyScheduleCard
                key={i}
                control={form.control}
                index={i}
                dayName={defaultDays.fields[i].day}
                removeDay={() => defaultDays.remove(i)}
              />
            ))}
          </Accordion>
        )}

        {/* OVERRIDES */}
        {choice && (
          <div className="space-y-6">
            <h3 className="h6">Overrides ({choice.name}) </h3>

            {overrides.fields.map((override, oi) => (
              <div key={override.id} className="border p-4 rounded-lg">
                <Accordion type="single" collapsible>
                  {(
                    form.getValues(`overrides.${oi}.weekly_schedule`) ?? []
                  ).map((day, di) => (
                    <DailyScheduleCard
                      key={di}
                      control={form.control}
                      index={di}
                      namePrefix={`overrides.${oi}.weekly_schedule`}
                      dayName={day.day}
                    />
                  ))}
                </Accordion>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => overrides.remove(oi)}
                >
                  Remove Override
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                overrides.append(
                  createOverrideFromDefault(
                    form.getValues("default_weekly_schedule"),
                    choice,
                  ),
                )
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Override
            </Button>
          </div>
        )}

        <FormError message={error} />
        <FormSuccess message={success} />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
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
}
