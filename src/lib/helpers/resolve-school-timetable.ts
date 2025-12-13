import type {
  SchoolTimetable,
  DailySchoolSchedule,
} from "@/lib/schema/school/school-timetable-schema";

export function resolveSchoolTimetable(
  timetable: SchoolTimetable,
  sectorId: string,
  tradeId?: string,
): DailySchoolSchedule[] {
  const now = new Date();

  const overrides = timetable.overrides ?? [];

  const isActive = (o: any) => {
    if (o.meta?.start_date && new Date(o.meta.start_date) > now) return false;
    if (o.meta?.end_date && new Date(o.meta.end_date) < now) return false;
    return true;
  };

  const tradeOverride = overrides.find(
    (o: any) =>
      o.type === "Trade" &&
      tradeId &&
      o.applies_to.includes(tradeId) &&
      isActive(o),
  );

  const sectorOverride = overrides.find(
    (o: any) =>
      o.type === "Sector" && o.applies_to.includes(sectorId) && isActive(o),
  );

  const activeOverride = tradeOverride ?? sectorOverride;

  if (!activeOverride) {
    return timetable.default_weekly_schedule;
  }

  const overrideMap = new Map(
    activeOverride.weekly_schedule.map((d) => [d.day, d]),
  );

  return timetable.default_weekly_schedule.map(
    (day) => overrideMap.get(day.day) ?? day,
  );
}
