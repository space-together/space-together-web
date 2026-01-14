import { z } from "zod";
import { RelatedUserSchema } from "@/lib/schema/common-schema";

export const SchoolJwtClaimsSchema = z.object({
  id: z.string(),
  database_name: z.string(),
  creator_id: z.string().optional(),
  name: z.string(),
  username: z.string(),
  logo: z.string().optional(),
  school_type: z.string().optional(),
  affiliation: z.string().optional(),
  created_at: z.string().optional(),
  member: RelatedUserSchema.optional(),
  exp: z.number(),
  iat: z.number(),
});

export type SchoolJwtClaims = z.infer<typeof SchoolJwtClaimsSchema>;
