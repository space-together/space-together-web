import z from "zod";
import { userRoleContext } from "../context/user-context";

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
    .max(50, {
      message: "Password max characters are 100",
    }),
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
  image: z.string().optional(),
  age: z.object({
    year: z.number().min(1900, "Year must be valid").max(new Date().getFullYear(), "Year cannot be in the future"),
    month: z.number().min(1, "Month must be between 1 and 12").max(12, "Month must be between 1 and 12"),
    day: z.number().min(1, "Day must be valid").max(31, "Day must be valid"),
  }).refine(
    (data) => {
      const { year, month, day } = data;
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age >= 2 && age <= 100;
    },
    {
      message: "Age must be between 3 and 95 years old.",
    }
  ),
  phone: z.string().min(10 , {
    message : "Minium character are 10"
  }).regex(/^\d+$/, "Phone number must contain only numbers").optional(),
  role: z.enum(userRoleContext as [string, ...string[]], {
    message: "Role must be one of 'STUDENT', 'TEACHER', or 'SCHOOL STAFF'",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender must be one of 'Male', 'Female', or 'Other'",
  }),
  location: z.object({
    country: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
  }).optional(),
  bio: z.string().optional(),
});

export type onboardingSchemaTypes = z.infer<typeof onboardingSchema>;
