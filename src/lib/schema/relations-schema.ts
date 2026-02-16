import { mainClassSchema } from "@/lib/schema/admin/main-classes-schema";
import { tradeSchema } from "@/lib/schema/admin/tradeSchema";
import { ClassSchema } from "@/lib/schema/class/class-schema";
import { ParentSchema } from "@/lib/schema/parent/parent-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { StudentSchema } from "@/lib/schema/student/student-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

// ---------------------------------------------
// class With Relations
// ---------------------------------------------
export const ClassWithOthersSchema = z.object({
  ...ClassSchema.shape,
  school: SchoolSchema.optional(), // SchoolSchema if available
  creator: UserModelSchema.optional(), // UserSchema
  class_teacher: TeacherSchema.optional(), // TeacherSchema
  main_class: mainClassSchema.optional(), // MainClassSchema
  trade: tradeSchema.optional(),
});
export type ClassWithOthers = z.infer<typeof ClassWithOthersSchema>;

// ---------------------------------------------
// Student With Relations
// ---------------------------------------------
export const StudentWithRelationsSchema = z.object({
  ...StudentSchema.shape,
  user: UserModelSchema.optional(), // Replace with your actual User schema
  creator: UserModelSchema.optional(), // Replace with your actual User schema
  school: SchoolSchema.optional(), // Replace with your actual School schema
  class: ClassSchema.optional(), // Replace with your actual Class schema
  subclass: ClassSchema.optional(), // Replace with your actual Class schema
});

export type StudentWithRelations = z.infer<typeof StudentWithRelationsSchema>;

// ---------------------------------------------
// Parent With Relations
// ---------------------------------------------
export const ParentWithRelationsSchema = z.object({
  ...ParentSchema.shape,
  user: UserModelSchema.optional(),
  school: SchoolSchema.optional(),
  students: z.array(StudentSchema).optional(),
});

export type ParentWithRelations = z.infer<typeof ParentWithRelationsSchema>;

// ---------------------------------------------
// user With Relations
// ---------------------------------------------

export const PaginatedUsersSchema = z.object({
  users: z.array(UserModelSchema),
  total: z.number().int(),
  total_pages: z.number().int(),
  current_page: z.number().int(),
});

export type PaginatedUsers = z.infer<typeof PaginatedUsersSchema>;
