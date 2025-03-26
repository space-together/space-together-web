"use server";
import apiRequest from "@/services/api-request";
import { LoginModel, loginModelTypes, registerSchema, registerSchemaType } from "@/utils/schema/userSchema";
import { setCookie } from "./session";
import { userSessionType } from "@/models/auth/session-model";
import { cookies } from "next/headers";
import { COOKIE_SESSION_KEY } from "@/env";

export type accountProvide = "Credentials" | "Google";

export const registerAuthApi = async (values: registerSchemaType) => {
  const validation = registerSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid Register Validation" };
  }

  try {
    const data = await apiRequest<registerSchemaType, userSessionType>('post', '/auth/register', validation.data);
    if (!data.data) {
      return { error: data.error };
    }

    await setCookie(data.data);
    return { success: data.success, data: data.data, error: data.error }
  } catch (error) {
    return { error: `An unexpected error occurred, ${error}` }
  }
}

export const loginAuthApi = async (values: loginModelTypes) => {
  const validation = LoginModel.safeParse(values);
  if (!validation.success) return { error: "Invalid Login Validation" }
  try {
    const data = {
      email: validation.data.email,
      password: validation.data.password,
      provider: "Credentials" as accountProvide
    }
    const login = await apiRequest<typeof data, userSessionType>('post', '/auth/login', data);
    const sessionId = (await cookies()).get(COOKIE_SESSION_KEY)?.value

    if (sessionId == null) {
      if (login.data) {
        await setCookie(login.data);
      }
    }
    return { success: login.success, data: login.data, error: login.error }
  } catch (error) {
    return { error: `An unexpected error occurred, ${error}` }
  }
}