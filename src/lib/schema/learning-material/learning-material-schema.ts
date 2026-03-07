import z from "zod";

// ---------------------------------------------
// Learning Material Schema
// ---------------------------------------------
export const MaterialTypeSchema = z.enum([
  "Lesson Note",
  "Resource",
  "Video",
  "File",
]);
export type MaterialType = z.infer<typeof MaterialTypeSchema>;

export const LearningMaterialSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  school_id: z.string().optional(),
  subject_id: z.string(),
  teacher_id: z.string().optional(),
  
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  type: MaterialTypeSchema,
  
  file_url: z.string().optional(),
  file_id: z.string().optional(),
  file_size: z.number().optional(),
  file_type: z.string().optional(),
  
  video_url: z.string().optional(),
  
  is_published: z.boolean().default(true),
  is_deleted: z.boolean().default(false),
  
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type LearningMaterial = z.infer<typeof LearningMaterialSchema>;

export const LearningMaterialBaseSchema = LearningMaterialSchema.pick({
  subject_id: true,
  title: true,
  description: true,
  type: true,
  file_url: true,
  video_url: true,
  is_published: true,
});

export type LearningMaterialBase = z.infer<typeof LearningMaterialBaseSchema>;
