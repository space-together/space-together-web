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

export type classSchemaType = z.infer<typeof classSchema>;

export const classUpdateNameSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Maximum character is 50",
    }),
});

export type classUpdateNameSchemaType = z.infer<typeof classUpdateNameSchema>;

export const classUpdateSymbolSchema = z.object({
  symbol: z.string(),
});

export type classUpdateSymbolSchemaType = z.infer<
  typeof classUpdateSymbolSchema
>;

export const classUpdateUsernameSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Maximum character is 50",
    })
    .refine(
      (username) => {
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        if (usernameRegex.test(username)) {
          return true; // Username is valid
        }

        const invalidChars = [...username].filter(
          (char) => !usernameRegex.test(char)
        );

        const correctedUsername = [...username]
          .filter((char) => usernameRegex.test(char))
          .join("");

        if (correctedUsername) {
          return {
            success: false,
            message: `Invalid username: contains disallowed characters [${invalidChars.join(
              ""
            )}]. Suggested username: '${correctedUsername}'.`,
          };
        } else {
          return {
            success: false,
            message: `Invalid username: contains disallowed characters [${invalidChars.join(
              ""
            )}]. Please try another name.`,
          };
        }
      },
      {
        message: "Invalid username format",
      }
    ),
});

export type classUpdateUsernameSchemaType = z.infer<
  typeof classUpdateUsernameSchema
>;
