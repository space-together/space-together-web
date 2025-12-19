import * as z from "zod";

export const JoinClassSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Class username is required",
    })
    .max(50),
  code: z
    .string()
    .min(5, {
      message: "Minimum characters are 5",
    })
    .max(5),
});

export type JoinClassDto = z.infer<typeof JoinClassSchema>;
