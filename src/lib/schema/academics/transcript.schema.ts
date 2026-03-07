import { z } from "zod";
import { StudentInfoSchema } from "./report-card.schema";

export const PromotionStatusSchema = z.enum(["Promoted", "Repeated", "Pending"]);
export const StudentFinalStatusSchema = z.enum([
  "Promoted",
  "Repeated",
  "Graduated",
  "Left",
]);

export const SubjectGradeSchema = z.object({
  subject_name: z.string(),
  final_grade: z.string(),
  credits: z.number().optional().nullable(),
});

export const TermSummarySchema = z.object({
  term_id: z.string(),
  term_name: z.string(),
  gpa: z.number(),
  subjects: z.array(SubjectGradeSchema),
});

export const YearlyPerformanceSchema = z.object({
  education_year_id: z.string(),
  year_label: z.string(),
  class_name: z.string(),
  term_results: z.array(TermSummarySchema),
  yearly_gpa: z.number(),
  yearly_grade: z.string(),
  promotion_status: PromotionStatusSchema,
});

export const TranscriptSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  student_id: z.string(),
  student_info: StudentInfoSchema,
  academic_years: z.array(YearlyPerformanceSchema),
  cumulative_gpa: z.number(),
  final_status: StudentFinalStatusSchema,
  generated_at: z.string().datetime(),
  generated_by: z.string(),
});

export type Transcript = z.infer<typeof TranscriptSchema>;
export type YearlyPerformance = z.infer<typeof YearlyPerformanceSchema>;
export type TermSummary = z.infer<typeof TermSummarySchema>;
export type SubjectGrade = z.infer<typeof SubjectGradeSchema>;
export type PromotionStatus = z.infer<typeof PromotionStatusSchema>;
export type StudentFinalStatus = z.infer<typeof StudentFinalStatusSchema>;
