import { z } from "zod";

export const BackupTypeEnum = z.enum(["MANUAL", "AUTOMATED"]);
export const BackupStatusEnum = z.enum(["IN_PROGRESS", "COMPLETED", "FAILED"]);

export const SchoolBackupSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  school_id: z.string(),
  backup_name: z.string(),
  backup_type: BackupTypeEnum,
  file_path: z.string(),
  size_bytes: z.number(),
  status: BackupStatusEnum,
  created_by: z.string(),
  created_at: z.string().or(z.date()),
  completed_at: z.string().or(z.date()).nullable().optional(),
  error_message: z.string().nullable().optional(),
  school: z.any().optional(),
  creator: z.any().optional(),
});

export type SchoolBackup = z.infer<typeof SchoolBackupSchema>;
export type BackupType = z.infer<typeof BackupTypeEnum>;
export type BackupStatus = z.infer<typeof BackupStatusEnum>;

export const DeletedEntitySchema = z.object({
  entity_type: z.string(),
  entity_id: z.string(),
  entity_name: z.string().optional(),
  deleted_at: z.string().or(z.date()),
  deleted_by: z.string(),
  deleted_by_name: z.string().nullable().optional(),
  school_id: z.string(),
});

export type DeletedEntity = z.infer<typeof DeletedEntitySchema>;
