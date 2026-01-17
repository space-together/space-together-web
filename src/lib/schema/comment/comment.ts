import { z } from "zod";
import { ActorRefSchema, RelatedUserSchema } from "../common-schema";

export const CommentSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: ActorRefSchema,
  target_post_id: z.string(),
  parent_comment_id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;

export const CommentBaseSchema = CommentSchema.pick({
  content: true,
  author: true,
  target_post_id: true,
  parent_comment_id: true,
});

export type CommentBase = z.infer<typeof CommentBaseSchema>;

export const CommentWithRelationsSchema = z.object({
  ...CommentSchema.shape,
  author_user: RelatedUserSchema.optional(),
});

export type CommentWithRelations = z.infer<typeof CommentWithRelationsSchema>;
