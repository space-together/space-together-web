import { z } from "zod";
import {
  GenderSchema,
  OptionSchema,
  ParentStatusSchema,
  RelationshipSchema,
} from "../common-details-schema";

export const ParentSchema = z.object({
  _id: z.string(),
  user_id: z.string(),
  school_id: z.string(),
  student_ids: z.array(z.string()),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  gender: GenderSchema.optional().nullable(),
  image: z.string().optional().nullable(),
  image_id: z.string().optional().nullable(),
  relationship: RelationshipSchema.optional().nullable(),
  occupation: z.string().optional().nullable(),
  national_id: z.string().optional().nullable(),
  status: ParentStatusSchema.optional(),
  is_active: z.boolean(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
});

export const ParentBaseSchema = ParentSchema.omit({
  _id: true,
  created_at: true,
  updated_at: true,
  student_ids: true,
  school_id: true,
  user_id: true,
}).extend({
  student_ids: z.array(OptionSchema).optional(),
});

export type ParentBase = z.infer<typeof ParentBaseSchema>;

export const ChildSummarySchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  student_image: z.string().optional().nullable(),
  student_gender: GenderSchema.optional().nullable(),
  class_name: z.string().optional().nullable(),
  class_id: z.string().optional().nullable(),
  attendance_percentage: z.number(),
  gpa: z.number().optional().nullable(),
  outstanding_fees: z.number(),
});

export const ParentDashboardSchema = z.object({
  total_children: z.number(),
  children: z.array(ChildSummarySchema),
  latest_announcements: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      created_at: z.string().or(z.date()),
      priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().nullable(),
    }),
  ),
});

export const AttendanceRecordSchema = z.object({
  id: z.string(),
  date: z.string().or(z.date()),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
  remarks: z.string().optional().nullable(),
});

export const AttendanceSummarySchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  attendance_percentage: z.number(),
  total_days: z.number(),
  present_count: z.number(),
  absent_count: z.number(),
  late_count: z.number(),
  excused_count: z.number(),
  recent_records: z.array(AttendanceRecordSchema),
});

export const SubjectResultSchema = z.object({
  subject_id: z.string(),
  subject_name: z.string(),
  marks: z.number(),
  grade: z.string(),
  remarks: z.string().optional().nullable(),
});

export const StudentResultsSchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  exam_name: z.string().optional().nullable(),
  gpa: z.number().optional().nullable(),
  rank: z.number().optional().nullable(),
  total_students: z.number().optional().nullable(),
  subjects: z.array(SubjectResultSchema),
  teacher_remarks: z.string().optional().nullable(),
});

export const PaymentRecordSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().or(z.date()),
  payment_method: z.string().optional().nullable(),
  reference: z.string().optional().nullable(),
});

export const FinanceSummarySchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  total_required: z.number(),
  amount_paid: z.number(),
  outstanding_balance: z.number(),
  payment_history: z.array(PaymentRecordSchema),
  status: z.enum(["PAID", "PARTIAL", "PENDING"]),
});

export const AnnouncementSchema = z.object({
  id: z.string(),
  _id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  created_at: z.string().or(z.date()),
  created_by: z.string().optional().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().nullable(),
});

export type Parent = z.infer<typeof ParentSchema>;
export type ChildSummary = z.infer<typeof ChildSummarySchema>;
export type ParentDashboard = z.infer<typeof ParentDashboardSchema>;
export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;
export type AttendanceSummary = z.infer<typeof AttendanceSummarySchema>;
export type SubjectResult = z.infer<typeof SubjectResultSchema>;
export type StudentResults = z.infer<typeof StudentResultsSchema>;
export type PaymentRecord = z.infer<typeof PaymentRecordSchema>;
export type FinanceSummary = z.infer<typeof FinanceSummarySchema>;
export type Announcement = z.infer<typeof AnnouncementSchema>;
