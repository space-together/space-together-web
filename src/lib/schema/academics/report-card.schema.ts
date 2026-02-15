import { z } from "zod";
import { StudentTermResultSchema } from "./student-result.schema";

export const StudentInfoSchema = z.object({
  name: z.string(),
  registration_number: z.string(),
  class_name: z.string(),
  image: z.string().optional().nullable(),
});

export const AttendanceSummarySchema = z.object({
  total_days: z.number().int(),
  days_present: z.number().int(),
  days_absent: z.number().int(),
  attendance_percentage: z.number(),
});

export const TeacherRemarkSchema = z.object({
  class_subject_id: z.string(),
  subject_name: z.string(),
  teacher_name: z.string(),
  remark: z.string(),
});

export const ReportCardSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  student_id: z.string(),
  education_year_id: z.string(),
  term_id: z.string(),
  exam_id: z.string(),
  student_info: StudentInfoSchema,
  academic_performance: StudentTermResultSchema,
  attendance_summary: AttendanceSummarySchema,
  teacher_remarks: z.array(TeacherRemarkSchema),
  class_teacher_comment: z.string().optional().nullable(),
  principal_comment: z.string().optional().nullable(),
  report_template_id: z.string().optional().nullable(),
  generated_at: z.string().datetime(),
  generated_by: z.string(),
});

export type ReportCard = z.infer<typeof ReportCardSchema>;
export type StudentInfo = z.infer<typeof StudentInfoSchema>;
export type AttendanceSummary = z.infer<typeof AttendanceSummarySchema>;
export type TeacherRemark = z.infer<typeof TeacherRemarkSchema>;
