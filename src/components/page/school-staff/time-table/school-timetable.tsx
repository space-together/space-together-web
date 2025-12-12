"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { SchoolTimetable } from "@/lib/schema/school/school-timetable-schema";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, otherwise use standard template literals
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";
import SchoolTimetableDialog from "./school-timetable-dialog";

interface Props {
  timetable: SchoolTimetable;
  auth: AuthContext;
}

type TimeItem = {
  label: string;
  start: string;
  end?: string;
  description?: string;
  className?: string; // Color styling
  type: "main" | "break" | "activity" | "lunch"; // generic type for styling logic
};

const toMinutes = (t?: string) => {
  if (!t) return Infinity; // if undefined, push to end
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const SchoolTimetableViewer = ({ timetable, auth }: Props) => {
  const { data } = useRealtimeData<SchoolTimetable>("school_timetable");
  const [currentTimetable, setCurrentTimetable] = useState(timetable);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === timetable._id);
      if (updated) setCurrentTimetable(updated);
    }
  }, [data, timetable._id]);

  const weekly = currentTimetable.default_weekly_schedule;

  // Sort days (Monday -> Friday)
  const sortedWeekly = [...weekly].sort((a, b) => {
    const startA = toMinutes(a.start);
    const startB = toMinutes(b.start);

    if (startA !== startB) return startA - startB;

    const endA = a.end ? toMinutes(a.end) : Infinity;
    const endB = b.end ? toMinutes(b.end) : Infinity;

    return endA - endB;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <div className=" flex flex-row gap-4 items-center">
          <CardTitle>Default weekly schedule</CardTitle>
          <SchoolTimetableDialog auth={auth} timetable={currentTimetable} />
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {/* Grid Layout: One column per Day */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {sortedWeekly.map((day) => {
            // 1. Collect events for this specific day
            const events: TimeItem[] = [
              {
                label: "School Start",
                start: day.school_start_time,
                type: "main",
                className: "border-l-4  bg-primary/5",
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
                className: "border-l-4  bg-primary/5",
              },
            ];

            if (day.breaks) {
              day.breaks.forEach((b) =>
                events.push({
                  label: b.title,
                  start: b.start_time,
                  end: b.end_time,
                  description: b.description,
                  type: "break",
                  className: "bg-base-content/10 border ",
                }),
              );
            }

            if (day.lunch) {
              events.push({
                label: day.lunch.title,
                start: day.lunch.start_time,
                end: day.lunch.end_time,
                description: day.lunch.description,
                type: "lunch",
                className: "bg-base-300/50  border ",
              });
            }

            if (day.activities) {
              day.activities.forEach((a) =>
                events.push({
                  label: a.title,
                  start: a.start_time,
                  end: a.end_time,
                  description: a.description,
                  type: "activity",
                  className: "bg-info/20 border ",
                }),
              );
            }

            // 2. Sort events by time
            events.sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

            return (
              <div key={day.day} className="flex flex-col gap-3 min-w-full">
                {/* Day Header */}
                <div className="text-center p-2  font-bold uppercase tracking-wide text-sm sticky bg-background/80 backdrop-blur-md z-30  top-0 border-b-base-content/20 border-b">
                  {day.day}
                </div>

                {/* Events List */}
                <div className="flex flex-col gap-2">
                  {events.map((event, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "relative p-3 card  border-base-content/40 text-sm shadow-sm transition-all hover:shadow-md",
                        "bg-card text-card-foreground border",
                        event.className, // Apply specific color classes
                      )}
                    >
                      {/* Time Badge */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs bg-base-300 px-1.5 py-0.5 rounded border">
                          {event.start}
                        </span>
                        {event.end && (
                          <div className=" flex gap-2">
                            -
                            <span className="font-mono font-bold text-xs bg-base-300 px-1.5 py-0.5 rounded border">
                              {event.end}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Title */}
                      <div className="font-semibold leading-tight">
                        {event.label}
                      </div>
                      {/* Description */}
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
      </CardContent>
    </Card>
  );
};

export default SchoolTimetableViewer;
