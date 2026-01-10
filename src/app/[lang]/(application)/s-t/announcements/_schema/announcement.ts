import { ClassSchema } from "@/lib/schema/class/class-schema";
import { userRoleSchema } from "@/lib/schema/common-details-schema";
import { RelatedUserSchema } from "@/lib/schema/common-schema";
import { z } from "zod";

export const MentionSchema = z.object({
  _id: z.string(),
  role: userRoleSchema,
});

export type Mention = z.infer<typeof MentionSchema>;

export const PublishedSchema = z.object({
  id: z.string(),
  role: userRoleSchema,
});

export type Published = z.infer<typeof PublishedSchema>;

export const AnnouncementSchema = z.object({
  _id: z.string().optional(),

  content: z.string().min(1),

  mention: z.array(MentionSchema).optional(),

  published: PublishedSchema,

  class_id: z.string().optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Announcement = z.infer<typeof AnnouncementSchema>;

export const AnnouncementWithRelationsSchema = z.object({
  ...AnnouncementSchema.shape,

  published_user: RelatedUserSchema.optional(),

  mentioned_users: z.array(RelatedUserSchema).optional(),

  class: ClassSchema.optional(),
});

export type AnnouncementWithRelations = z.infer<
  typeof AnnouncementWithRelationsSchema
>;
