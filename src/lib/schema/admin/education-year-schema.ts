import { z } from "zod";

export const TermSchema = z.object({
  name: z.string(),
  order: z.union([z.number(), z.string()]),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
});

export type Term = z.infer<typeof TermSchema>;

// Partial (like TermPartial in Rust)
export const TermPartialSchema = TermSchema.partial();

export const EducationYearSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),

  curriculum_id: z.string(),

  label: z.string(), // "2025-2026"

  start_date: z.string().optional(),
  end_date: z.string().optional(),

  terms: z.array(TermSchema),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type EducationYear = z.infer<typeof EducationYearSchema>;

// Partial schema (Rust: EducationYearPartial)
export const EducationYearPartialSchema = EducationYearSchema.partial();
