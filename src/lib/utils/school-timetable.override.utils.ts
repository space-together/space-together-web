import type { SchoolTimetableEducationChoice } from "@/components/page/school-staff/time-table/school-timetable-choose-education";
import type {
  SchoolTimetable,
  TimetableOverride,
} from "@/lib/schema/school/school-timetable-schema";

export function createOverrideFromDefault(
  defaultSchedule: SchoolTimetable["default_weekly_schedule"],
  choice: SchoolTimetableEducationChoice,
): TimetableOverride {
  return {
    type: choice.type, // Trade | Sector
    id: choice.id,
    _id: choice.id,
    applies_to: [choice.id],
    weekly_schedule: structuredClone(defaultSchedule),
  };
}
