import { z } from "zod";
export const userSession = z.object({
  id: z.string(),
  user_id : z.string(),
  token: z.string(),
  session_token: z.string(),
  created_at: z.string(),
  expires_at: z.string(),
  updated_at: z.string(),
})
export type userSessionType = z.infer<typeof userSession>