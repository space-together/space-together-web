"use server";

import { LoginModel, loginModelTypes } from "@/utils/schema/userSchema";
import { getUserByEmailAPI } from "../functions/fetchDataFn";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginService = async (value: loginModelTypes) => {
  const validation = LoginModel.safeParse(value);
  if (!validation.success) {
    return { error: "Invalid Login Validation" };
  }

  const { email, password } = validation.data;

  try {
    const exitUser = await getUserByEmailAPI(email);
    if ("message" in exitUser) {
      return { error: exitUser.message };
    }

    await signIn("credentials", {
      email,
      password,
    });

    return { success: "Login successful" };
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
