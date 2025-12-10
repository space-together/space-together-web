"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Weekdays } from "@/lib/const/common-details-const";
import type { SchoolTimetable } from "@/lib/schema/school/school-timetable-schema";

interface Props {
  timetable: SchoolTimetable;
}

type TimeItem = {
  label: string;
  start: string;
  end?: string;
  description?: string;
  className?: string;
};

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const SchoolTimetableViewer = ({ timetable }: Props) => {
  const weekly = timetable.default_weekly_schedule;

  const sortedWeekly = [...weekly].sort(
    (a, b) => Weekdays.indexOf(a.day) - Weekdays.indexOf(b.day),
  );

  // Collect all unique time events from all days
  const allEvents = new Set<string>();

  const dayEventsMap: Record<string, TimeItem[]> = {};

  sortedWeekly.forEach((day) => {
    const events: TimeItem[] = [
      { label: "School Start", start: day.school_start_time },
      { label: "Study Start", start: day.study_start_time },
      { label: "Study End", start: day.study_end_time },
      { label: "School End", start: day.school_end_time },
    ];

    if (day.breaks) {
      day.breaks.forEach((b) =>
        events.push({
          label: b.title,
          start: b.start_time,
          end: b.end_time,
          description: b.description,
          className: "bg-base-content/5",
        }),
      );
    }

    if (day.lunch) {
      events.push({
        label: day.lunch.title,
        start: day.lunch.start_time,
        end: day.lunch.end_time,
        description: day.lunch.description,
        className: "bg-info/15",
      });
    }

    if (day.activities) {
      day.activities.forEach((a) =>
        events.push({
          label: a.title,
          start: a.start_time,
          end: a.end_time,
          description: a.description,
          className: "bg-warning/20",
        }),
      );
    }

    // Sort events within the day
    events.sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

    dayEventsMap[day.day] = events;

    // Add times to global event list
    events.forEach((e) => allEvents.add(e.start));
  });

  // Create a sorted list of all time points across the week
  const unifiedTimeline = [...allEvents].sort(
    (a, b) => toMinutes(a) - toMinutes(b),
  );

  return (
    <Card className=" gap-0">
      <CardHeader>
        <CardTitle>Default Weekly Schedule</CardTitle>
      </CardHeader>

      <CardContent className=" p-0">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Days as header */}
            <thead>
              <tr>
                <th className="bg-base-300">Time</th>
                {sortedWeekly.map((day) => (
                  <th key={day.day} className="bg-base-300 text-center">
                    {day.day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {unifiedTimeline.map((time, idx) => (
                <tr key={idx}>
                  {/* Time column */}
                  <td className="font-semibold">{time}</td>

                  {/* Day columns */}
                  {sortedWeekly.map((day) => {
                    const event = dayEventsMap[day.day].find(
                      (e) => e.start === time,
                    );

                    return (
                      <td key={day.day} className={event?.className ?? ""}>
                        {event ? (
                          <div>
                            <div className="font-medium">{event.label}</div>
                            {event.end && (
                              <div className="text-xs opacity-70">
                                {event.start} – {event.end}
                              </div>
                            )}
                            {event.description && (
                              <div className="text-xs opacity-50">
                                {event.description}
                              </div>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolTimetableViewer;
