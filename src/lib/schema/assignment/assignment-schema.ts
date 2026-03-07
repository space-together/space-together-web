import z from "zod";

// ---------------------------------------------
// Assignment Schema
// ---------------------------------------------
export const AssignmentStatusSchema = z.enum(["Draft", "Published", "Archived"]);
export type AssignmentStatus = z.infer<typeof AssignmentStatusSchema>;

export const AssignmentSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  school_id: z.string().optional(),
  class_id: z.string(),
  subject_id: z.string(),
  teacher_id: z.string().optional(),
  
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  instructions: z.string().optional(),
  
  due_date: z.string().min(1, { message: "Due date is required" }),
  max_score: z.number().min(1, { message: "Max score must be greater than 0" }),
  
  allow_late_submission: z.boolean().default(false),
  attachment_url: z.string().optional(),
  attachment_id: z.string().optional(),
  
  status: AssignmentStatusSchema.default("Published"),
  auto_grade_enabled: z.boolean().default(false),
  is_deleted: z.boolean().default(false),
  
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Assignment = z.infer<typeof AssignmentSchema>;

export const AssignmentBaseSchema = AssignmentSchema.pick({
  class_id: true,
  subject_id: true,
  title: true,
  description: true,
  instructions: true,
  due_date: true,
  max_score: true,
  allow_late_submission: true,
  attachment_url: true,
  status: true,
});

export type AssignmentBase = z.infer<typeof AssignmentBaseSchema>;

// ---------------------------------------------
// Submission Schema
// ---------------------------------------------
export const SubmissionStatusSchema = z.enum(["Submitted", "Graded", "Late"]);
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;

export const SubmissionSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  assignment_id: z.string(),
  student_id: z.string().optional(),
  
  file_url: z.string().optional(),
  file_id: z.string().optional(),
  comment: z.string().optional(),
  
  is_late: z.boolean().default(false),
  score: z.number().optional(),
  feedback: z.string().optional(),
  feedback_file_url: z.string().optional(),
  feedback_file_id: z.string().optional(),
  
  status: SubmissionStatusSchema.default("Submitted"),
  submitted_at: z.coerce.date().optional(),
  graded_at: z.coerce.date().optional(),
  graded_by: z.string().optional(),
  
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Submission = z.infer<typeof SubmissionSchema>;

export const SubmissionBaseSchema = z.object({
  file_url: z.string().optional(),
  comment: z.string().optional(),
});

export type SubmissionBase = z.infer<typeof SubmissionBaseSchema>;

export const GradeSubmissionSchema = z.object({
  score: z.number().min(0, { message: "Score must be positive" }),
  feedback: z.string().optional(),
  feedback_file: z.string().optional(),
});

export type GradeSubmission = z.infer<typeof GradeSubmissionSchema>;
