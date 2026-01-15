import { ClassSchema } from "@/lib/schema/class/class-schema";
import { ActorRefSchema, RelatedUserSchema } from "@/lib/schema/common-schema";
import { z } from "zod";

export const AnnouncementSchema = z.object({
  _id: z.string(),

  content: z.string().min(1, {
    message: "Content is required",
  }),

  mention: z.array(ActorRefSchema).optional(),

  published: ActorRefSchema,

  classes_ids: z.array(z.string()).optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Announcement = z.infer<typeof AnnouncementSchema>;

export const AnnouncementWithRelationsSchema = z.object({
  ...AnnouncementSchema.shape,

  published_user: RelatedUserSchema.optional(),

  mentioned_users: z.array(RelatedUserSchema).optional(),

  classes: ClassSchema.optional(),
});

export type AnnouncementWithRelations = z.infer<
  typeof AnnouncementWithRelationsSchema
>;

export const AnnouncementBaseSchema = AnnouncementSchema.pick({
  content: true,
  mention: true,
  classes_ids: true,
}).extend({
  published: ActorRefSchema.optional(), // override to optional
});

export type AnnouncementBase = z.infer<typeof AnnouncementBaseSchema>;
