import z from "zod";

export const registerSchema = z.object({
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
  password: z
    .string()
    .min(6, {
      message: "Password min characters are 6",
    })
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
          password
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., MyName1!)",
      }
    ),
});

export type registerSchemaType = z.infer<typeof registerSchema>;

export const LoginModel = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required, please enter your password",
  }),
});

export type loginModelTypes = z.infer<typeof LoginModel>;

export const onboardingSchema = z.object({
  image: z.string(),
  age: z.date({
    required_error: "Please select a date.",
  }),
  phone: z.string().regex(/^\+250[0-9]{9}$/, "Invalid phone number for Rwanda"),
  role: z.string().min(1, {
    message: "Role is required",
  }),
  gender: z.enum(["M", "F", "O"], {
    message: "Gender must be one of 'Male', 'Female', or 'Other'",
  }),
});
export type onboardingSchemaTypes = z.infer<typeof onboardingSchema>;
