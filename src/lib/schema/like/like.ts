import { z } from "zod";
import { ActorRefSchema, RelatedUserSchema } from "../common-schema";

export const LikeSchema = z.object({
  _id: z.string(),
  actor: ActorRefSchema,
  target_id: z.string(),
  like: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Like = z.infer<typeof LikeSchema>;

export const LikeBaseSchema = LikeSchema.pick({
  actor: true,
  target_id: true,
  like: true,
});

export type LikeBase = z.infer<typeof LikeBaseSchema>;

export const LikePartialSchema = LikeSchema.partial();
export type LikePartial = z.infer<typeof LikePartialSchema>;

export const LikeWithRelationsSchema = z.object({
  ...LikeSchema.shape,
  author_user: RelatedUserSchema.optional(),
});

export type LikeWithRelations = z.infer<typeof LikeWithRelationsSchema>;
