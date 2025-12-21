import * as z from "zod";

export const JoinSchoolSchema = z.object({
  code: z
    .string()
    .min(5, {
      message: "Minimum characters are 5",
    })
    .max(5),
});

export type JoinSchoolDto = z.infer<typeof JoinSchoolSchema>;
