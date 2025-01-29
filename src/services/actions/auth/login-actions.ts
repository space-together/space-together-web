"use server";

import { LoginModel, loginModelTypes } from "@/utils/schema/userSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { Locale } from "@/i18n";

export const loginWithProvidesService = async (
  provide: "google" | "github",
  lang: Locale
) => {
  await signIn(provide, {
    redirectTo: `/${lang}`,
  });
};

export const loginService = async (value: loginModelTypes, lang: Locale) => {
  const validation = LoginModel.safeParse(value);
  if (!validation.success) {
    return { error: "Invalid Login Validation" };
  }

  const { email, password } = validation.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/${lang}/auth/onboarding`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Some thing went wrong!" };
      }
    }
    throw error;
  }
};
