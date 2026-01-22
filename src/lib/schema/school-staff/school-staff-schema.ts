import {
  AddressSchema,
  CertificationOrTrainingSchema,
  DepartmentSchema,
  EducationLevelSchema,
  EmploymentTypeSchema,
  JobTitleSchema,
  LanguageSchema,
  SchoolStaffTypeSchema,
  YearsOfExperienceSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

export const SchoolStaffSchema = z.object({
  _id: z.string(),
  user_id: z.string(),
  school_id: z.string().optional(),
  creator_id: z.string().optional(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  image: z.string().optional(),
  type: SchoolStaffTypeSchema,
  is_active: z.boolean(),
  tags: z.array(z.string()).default([]),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});
export type SchoolStaff = z.infer<typeof SchoolStaffSchema>;

export const SchoolStaffBaseSchema = SchoolStaffSchema.pick({
  name: true,
  email: true,
  type: true,
  image: true,
  is_active: true,
  school_id: true,
  creator_id: true,
});

export type SchoolStaffBase = z.infer<typeof SchoolStaffBaseSchema>;

export const SchoolStaffPartialSchema = SchoolStaffSchema.partial();

export type SchoolStaffPartial = z.infer<typeof SchoolStaffPartialSchema>;

export const StaffDepartmentSchema = z.object({
  department: DepartmentSchema.optional(),
  job_title: JobTitleSchema.optional(),
  employment_type: EmploymentTypeSchema.optional(),
});

export type StaffDepartment = z.infer<typeof StaffDepartmentSchema>;

export const StaffBackgroundSchema = z.object({
  years_of_experience: YearsOfExperienceSchema.optional(),
  address: AddressSchema.optional(),
  education_level: EducationLevelSchema.optional(),
  certifications_trainings: z.array(CertificationOrTrainingSchema).optional(),
  languages_spoken: z.array(LanguageSchema).optional(),
});

export type StaffBackground = z.infer<typeof StaffBackgroundSchema>;
