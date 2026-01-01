import {
  AddressSchema,
  AgeSchema,
  GenderSchema,
  LanguageSchema,
  LearningChallengeSchema,
  SpecialSupportSchema,
  StudentStatusSchema,
  StudyStyleSchema,
  SubjectCategorySchema,
} from "@/lib/schema/common-details-schema";
import { GuardianInfoSchema } from "@/lib/schema/parent/guardian-schema";
import z from "zod";

// ---------------------------------------------
// Base Student Schema
// ---------------------------------------------
export const StudentSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  user_id: z.string().optional(),
  school_id: z.string().optional(),
  class_id: z.string().optional(),
  creator_id: z.string().optional(),
  image: z.string().optional(),
  image_id: z.string().optional(),

  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  gender: GenderSchema.optional(),
  date_of_birth: AgeSchema.optional(),

  registration_number: z.string().optional(),
  admission_year: z.number().int().optional(),

  status: StudentStatusSchema.default("Active"),
  is_active: z.boolean().default(false),
  tags: z.array(z.string()).default([]),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Student = z.infer<typeof StudentSchema>;

export const StudentBaseSchema = StudentSchema.pick({
  name: true,
  email: true,
  phone: true,
  image: true,
  gender: true,
  date_of_birth: true,
  class_id: true,
  registration_number: true,
  admission_year: true,
  status: true,
  is_active: true,
  creator_id: true,
  tags: true,
  school_id: true,
});

export type StudentBase = z.infer<typeof StudentBaseSchema>;

export const StudentAcademicInterestSchema = z.object({
  favorite_subjects_category: z
    .array(SubjectCategorySchema)
    .nonempty("Please select at least one subject category."),
  preferred_study_styles: z
    .array(StudyStyleSchema)
    .nonempty("Please select at least one study style."),
  languages_spoken: z
    .array(LanguageSchema)
    .nonempty("Please select at least one language."),
});

export type StudentAcademicInterest = z.infer<
  typeof StudentAcademicInterestSchema
>;

export const StudentBackgroundSchema = z.object({
  age: AgeSchema.optional(),
  address: AddressSchema.optional(),
});

export type StudentBackground = z.infer<typeof StudentBackgroundSchema>;

export const studentSupportSchema = z.object({
  learning_challenges: z.array(LearningChallengeSchema).optional(),
  special_support_needed: z.array(SpecialSupportSchema).optional(),
  guardian_info: z.array(GuardianInfoSchema).optional(),
});

export type studentSupport = z.infer<typeof studentSupportSchema>;
