import { z } from "zod";
import { HHMM } from "../common-schema";
import { DaySpecialTypeSchema, WeekdaySchema } from "../common-details-schema";

/* --------------------------------
   TimeBlock
-----------------------------------*/
export const TimeBlockSchema = z.object({
  title: z.string().min(1, "title cannot be empty"),
  start_time: HHMM,
  end_time: HHMM,
  description: z.string().optional(),
});

export const TimeBlockPartialSchema = TimeBlockSchema.partial();

export const DailySchoolScheduleSchema = z.object({
  day: WeekdaySchema,

  is_school_day: z.boolean(),

  school_start_time: HHMM,
  school_end_time: HHMM,

  study_start_time: HHMM,
  study_end_time: HHMM,

  breaks: z.array(TimeBlockSchema),

  lunch: TimeBlockSchema.optional(),

  activities: z.array(TimeBlockSchema),

  special_type: DaySpecialTypeSchema,
});

export const DailySchoolSchedulePartialSchema =
  DailySchoolScheduleSchema.partial();

/* --------------------------------
   TimetableOverrideType Enum
-----------------------------------*/
export const TimetableOverrideTypeSchema = z.enum(["Trade", "Sector"]);

export type TimetableOverrideType = z.infer<typeof TimetableOverrideTypeSchema>;

/* --------------------------------
   TimetableOverride
-----------------------------------*/
export const TimetableOverrideSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),

  type: TimetableOverrideTypeSchema,

  applies_to: z.array(z.string()).min(1, "applies_to cannot be empty"),

  weekly_schedule: z
    .array(DailySchoolScheduleSchema)
    .min(1, "weekly_schedule must contain at least 1 day"),
});

export type TimetableOverride = z.infer<typeof TimetableOverrideSchema>;

export const TimetableOverridePartialSchema = TimetableOverrideSchema.partial();

/* --------------------------------
   SchoolEvent
-----------------------------------*/
export const SchoolEventSchema = z
  .object({
    event_id: z.string(),
    title: z.string().min(1, "title cannot be empty"),
    description: z.string().optional(),

    start_date: z.string().datetime(),
    end_date: z.string().datetime().optional(),
  })
  .refine(
    (val) =>
      !val.end_date || new Date(val.end_date) >= new Date(val.start_date),
    { message: "end_date cannot be earlier than start_date" },
  );

/* --------------------------------
   SchoolTimetable
-----------------------------------*/
export const SchoolTimetableSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),

  school_id: z.string(),
  academic_year_id: z.string().optional().nullable(),

  default_weekly_schedule: z
    .array(DailySchoolScheduleSchema)
    .min(1, "default_weekly_schedule cannot be empty"),

  overrides: z.array(TimetableOverrideSchema).optional(),

  events: z.array(SchoolEventSchema).optional(),

  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type SchoolTimetable = z.infer<typeof SchoolTimetableSchema>;

export const SchoolTimetablePartialSchema = SchoolTimetableSchema.partial();
