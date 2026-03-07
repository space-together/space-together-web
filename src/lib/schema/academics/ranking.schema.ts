import { z } from "zod";

export const StudentRankSchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  gpa: z.number(),
  average_percentage: z.number(),
  rank: z.number().int(),
  total_students: z.number().int(),
});

export const ClassRankingSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  class_id: z.string(),
  exam_id: z.string(),
  education_year_id: z.string(),
  rankings: z.array(StudentRankSchema),
  calculated_at: z.string().datetime(),
});

export type StudentRank = z.infer<typeof StudentRankSchema>;
export type ClassRanking = z.infer<typeof ClassRankingSchema>;
