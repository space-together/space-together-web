import {
  CommunicationMethodSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

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
