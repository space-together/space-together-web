import {
  CommunicationMethodSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";
import { SchoolStaffSchema } from "./school/school-staff-schema";
import { TeacherSchema } from "./school/teacher-schema";
import { StudentSchema } from "./student/student-schema";
import { UserModelSchema } from "./user/user-schema";

// ----------------------commutation---------------------------
export const SocialAndCommunicationSchema = z.object({
  social_media: z.array(SocialMediaSchema).optional(),
  preferred_communication_method: z.array(CommunicationMethodSchema).optional(),
});

export type SocialAndCommunication = z.infer<
  typeof SocialAndCommunicationSchema
>;

export const PaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number().int(),
    total_pages: z.number().int(),
    current_page: z.number().int(),
  });

export interface Paginated<T> {
  data: T[];
  total: number;
  total_pages: number;
  current_page: number;
}

export const HHMM = z
  .string()
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Time must be HH:MM format");

export const CountDocSchema = z.object({
  count: z.number().int(),
});

export type CountDoc = z.infer<typeof CountDocSchema>;

export const RelatedUserSchema = z.discriminatedUnion("user_type", [
  z.object({
    ...StudentSchema.shape,
    user_type: z.literal("STUDENT"),
  }),
  z.object({
    user_type: z.literal("TEACHER"),
    ...TeacherSchema.shape,
  }),
  z.object({
    ...SchoolStaffSchema.shape,
    user_type: z.literal("SCHOOLSTAFF"),
  }),
  z.object({
    ...UserModelSchema.shape,
    user_type: z.literal("USER"),
  }),
]);

export type RelatedUser = z.infer<typeof RelatedUserSchema>;
