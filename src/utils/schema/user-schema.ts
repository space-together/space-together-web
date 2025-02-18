import z from "zod";

export const userRoleSchema = z.object({
  role: z
    .string()
    .min(1, {
      message: "Role name is required",
    })
    .max(25, {
      message: "Maximum characters are 25",
    }),
});

export type userRoleSchemeType = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Full name is required, please enter your full name",
    })
    .max(80, {
      message: "Maximum characters are 80",
    })
    .refine((name) => name.trim().split(/\s+/).length > 1, {
      message: "Please enter your full name (e.g., First Last or more)",
    }),
  email: z.string().email({
    message: "Email is required",
  }),
  role: z.string().min(1, {
    message: "Role is required",
  }),
  gender: z.enum(["M", "F", "O"], {
    message: "Gender must be one of 'M', 'F', or 'O'",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password min characters are 6",
    })
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#()^&-_"/|~`])[A-Za-z\d@$!%*?&#()^&-_"/|~`]{6,}$/.test(
          password
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., MyName1!)",
      }
    ),
});

export type userSchemeType = z.infer<typeof userSchema>;

export const updateUserDataSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Full name is required, please enter your full name",
    })
    .max(80, {
      message: "Maximum characters are 80",
    })
    .refine((name) => name.trim().split(/\s+/).length > 1, {
      message: "Please enter your full name (e.g., First Last or more)",
    }),
  image: z.string(),
  username: z.string(),
  age: z
    .date({
      required_error: "Please select a date.",
    })
    .refine(
      (date) => {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const monthDifference = today.getMonth() - date.getMonth();
        const dayDifference = today.getDate() - date.getDate();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && dayDifference < 0)
        ) {
          age--;
        }
        return age >= 3 && age <= 95;
      },
      {
        message: "Age must be between 3 and 95 years old.",
      }
    ),
  phone: z.string().regex(/^\+250[0-9]{9}$/, "Invalid phone number for Rwanda"),
  bio: z.string(),
})

export type updateUserDataSchemaType = z.infer<typeof updateUserDataSchema>

export const updateUserEmailSchema = z.object({
  email : z.string().email(),
})

export type updateUserEmailSchemaType = z.infer<typeof updateUserEmailSchema>

export const updateUserPassword = z.object({
  currentPassword : z.string().min(1, {
    message : "current password is required"
  }),
  password: z
    .string()
    .min(6, {
      message: "Password min characters are 6",
    })
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#()^&-_"/|~`])[A-Za-z\d@$!%*?&#()^&-_"/|~`]{6,}$/.test(
          password
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., MyName1!)",
      }
    ),
})

export type updateUserPasswordType = z.infer<typeof updateUserPassword>