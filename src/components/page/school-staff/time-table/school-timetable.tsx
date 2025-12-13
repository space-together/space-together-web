"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { School } from "@/lib/schema/school/school-schema";
import type {
  DailySchoolScheduleSchema,
  SchoolTimetable,
} from "@/lib/schema/school/school-timetable-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Activity, useEffect, useMemo, useState } from "react";
import type { z } from "zod";

import CommonEmpty from "@/components/common/common-empty";
import SchoolTimetableChooseEducation, {
  type SchoolTimetableEducationChoice,
} from "./school-timetable-choose-education";
import SchoolTimetableDialog from "./school-timetable-dialog";

/* ----------------------------- TYPES ----------------------------- */

type WeeklySchedule = z.infer<typeof DailySchoolScheduleSchema>[];

type TimeItem = {
  label: string;
  start: string;
  end?: string;
  description?: string;
  className?: string;
  type: "main" | "break" | "activity" | "lunch";
};

/* ----------------------------- HELPERS ----------------------------- */

const toMinutes = (t?: string) => {
  if (!t) return Infinity;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/* ----------------------------- COMPONENT ----------------------------- */

interface Props {
  timetable: SchoolTimetable;
  auth: AuthContext;
  school: School;
}

const SchoolTimetableViewer = ({ timetable, auth, school }: Props) => {
  const { data } = useRealtimeData<SchoolTimetable>("school_timetable");

  const [currentTimetable, setCurrentTimetable] =
    useState<SchoolTimetable>(timetable);

  const [selectedEducation, setSelectedEducation] =
    useState<SchoolTimetableEducationChoice | null>(null);

  /* ---------------------- REALTIME UPDATE ---------------------- */

  useEffect(() => {
    if (!data?.length) return;

    const updated = data.find((d) => d._id === timetable._id);
    if (updated) setCurrentTimetable(updated);
  }, [data, timetable._id]);

  /* ---------------------- OVERRIDE MATCHING ---------------------- */

  const matchingOverride = useMemo(() => {
    if (!selectedEducation) return null;

    return (
      currentTimetable.overrides?.find(
        (override) =>
          override.type === selectedEducation.type &&
          override.applies_to.includes(selectedEducation.id),
      ) ?? null
    );
  }, [currentTimetable.overrides, selectedEducation]);

  /* ---------------------- SCHEDULE DECISION ---------------------- */

  const weeklyScheduleToDisplay: WeeklySchedule = useMemo(() => {
    if (!selectedEducation) {
      return currentTimetable.default_weekly_schedule;
    }

    if (matchingOverride) {
      return matchingOverride.weekly_schedule;
    }

    return [];
  }, [
    currentTimetable.default_weekly_schedule,
    matchingOverride,
    selectedEducation,
  ]);

  /* ---------------------- SORT DAYS ---------------------- */

  const sortedWeekly = useMemo(() => {
    return [...weeklyScheduleToDisplay].sort((a, b) => {
      const startA = toMinutes(a.start);
      const startB = toMinutes(b.start);

      if (startA !== startB) return startA - startB;

      return toMinutes(a.end) - toMinutes(b.end);
    });
  }, [weeklyScheduleToDisplay]);

  /* ---------------------- HANDLERS ---------------------- */

  const handleEducationChange = (
    choice: SchoolTimetableEducationChoice | null,
  ) => {
    setSelectedEducation(choice);
  };

  /* ----------------------------- UI ----------------------------- */

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <CardTitle className="capitalize">
            {selectedEducation
              ? matchingOverride
                ? `${selectedEducation.name} School Timetable`
                : `${selectedEducation.name} (No Override Timetable)`
              : "Default weekly schedule School Timetable"}
          </CardTitle>

          <SchoolTimetableDialog
            choice={selectedEducation}
            auth={auth}
            timetable={currentTimetable}
          />
        </div>

        {(school.curriculum || school.education_level) && (
          <Activity>
            <SchoolTimetableChooseEducation
              onChange={handleEducationChange}
              auth={auth}
              school={school}
            />
          </Activity>
        )}
      </CardHeader>

      <CardContent>
        {/* -------- EMPTY STATE -------- */}
        {selectedEducation && !matchingOverride ? (
          <CommonEmpty
            title="No school timetable override found"
            description={
              <span>
                There is no timetable configured for{" "}
                <span className="font-medium capitalize">
                  {selectedEducation.name}
                </span>
                .
              </span>
            }
          >
            <SchoolTimetableDialog
              timetable={timetable}
              choice={selectedEducation}
              auth={auth}
            />
          </CommonEmpty>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {sortedWeekly.map((day) => {
              const events: TimeItem[] = [
                {
                  label: "School Start",
                  start: day.school_start_time,
                  type: "main",
                  className: "border-l-4 border-primary bg-primary/5",
                },
                {
                  label: "Study Start",
                  start: day.study_start_time,
                  type: "main",
                },
                {
                  label: "Study End",
                  start: day.study_end_time,
                  type: "main",
                },
                {
                  label: "School End",
                  start: day.school_end_time,
                  type: "main",
                  className: "border-l-4 border-primary bg-primary/5",
                },
              ];

              day.breaks?.forEach((b) =>
                events.push({
                  label: b.title,
                  start: b.start_time,
                  end: b.end_time,
                  description: b.description,
                  type: "break",
                  className: "bg-base-content/10 border",
                }),
              );

              if (day.lunch) {
                events.push({
                  label: day.lunch.title,
                  start: day.lunch.start_time,
                  end: day.lunch.end_time,
                  description: day.lunch.description,
                  type: "lunch",
                  className: "bg-base-300/50 border",
                });
              }

              day.activities?.forEach((a) =>
                events.push({
                  label: a.title,
                  start: a.start_time,
                  end: a.end_time,
                  description: a.description,
                  type: "activity",
                  className: "bg-info/20 border",
                }),
              );

              events.sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

              return (
                <div key={day.day} className="flex flex-col gap-3 min-w-full">
                  <div className="text-center p-2 font-bold uppercase tracking-wide text-sm sticky bg-background/80 backdrop-blur-md z-30 top-0 border-b">
                    {day.day}
                  </div>

                  <div className="flex flex-col gap-2">
                    {events.map((event, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "relative p-3 card border text-sm shadow-sm transition-all hover:shadow-md",
                          "bg-card text-card-foreground",
                          event.className,
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-xs bg-base-300 px-1.5 py-0.5 rounded border">
                            {event.start}
                          </span>
                          {event.end && (
                            <>
                              -
                              <span className="font-mono font-bold text-xs bg-base-300 px-1.5 py-0.5 rounded border">
                                {event.end}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="font-semibold">{event.label}</div>

                        {event.description && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {event.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolTimetableViewer;
