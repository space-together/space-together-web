import z from "zod";

export const classSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Maximum character is 50",
    }),
  // trade: z.string(),
  // education: z.string(),
  // sector: z.string(),
  // class_teacher: z.string().email(),
  // class_type: z.string().min(1 , {
  //   message : "class type is required"
  // }),
  // class_room: z.string(),
  // is_public : z.string(),
  // image : z.string(),
  // username: z
  //   .string()
  //   .min(1, {
  //     message: "Username is required",
  //   })
  //   .max(50, {
  //     message: "Maximum character is 50",
  //   }),
  description: z
    .string()
    .min(1, {
      message: "Description  is required",
    })
    .max(200, {
      message: "Maximum character is 200",
    }),
});

export type classSchemaType = z.infer<typeof classSchema>

export const classUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Maximum character is 50" }),
  symbol: z.string(),
  username: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Maximum character is 50" })
    .refine(
      (username) => {
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        if (usernameRegex.test(username)) {
          return true;
        }

        const invalidChars = [...username].filter(
          (char) => !usernameRegex.test(char)
        );

        const correctedUsername = [...username]
          .filter((char) => usernameRegex.test(char))
          .join("");

        return correctedUsername
          ? { success: false, message: `Invalid username: contains disallowed characters [${invalidChars.join("")}]. Suggested username: '${correctedUsername}'.` }
          : { success: false, message: `Invalid username: contains disallowed characters [${invalidChars.join("")}]. Please try another name.` };
      },
      { message: "Invalid username format" }
    ),
});

export type classUpdateSchemaType = z.infer<typeof classUpdateSchema>;
