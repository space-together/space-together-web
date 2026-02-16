import { z } from "zod";

// Permission schema
export const PermissionSchema = z.object({
  name: z.string(),
  description: z.string(),
  scope: z.enum(["Own", "Class", "School"]),
});

export type Permission = z.infer<typeof PermissionSchema>;

// Role base schema for create/update
export const RoleBaseSchema = z.object({
  school_id: z.string().optional(),
  name: z.string().min(1, "Role name is required"),
  description: z.string().optional(),
  role_type: z.enum(["System", "Custom"]).default("Custom"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
  is_active: z.boolean().default(true),
});

export type RoleBase = z.infer<typeof RoleBaseSchema>;

// Full role schema (from API)
export const RoleSchema = RoleBaseSchema.extend({
  _id: z.string().optional(),
  id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type Role = z.infer<typeof RoleSchema>;

// Role assignment schema
export const RoleAssignmentSchema = z.object({
  user_id: z.string().min(1, "User is required"),
  role_id: z.string().min(1, "Role is required"),
  school_id: z.string().min(1, "School is required"),
});

export type RoleAssignment = z.infer<typeof RoleAssignmentSchema>;
