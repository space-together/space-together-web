"use server";
import apiRequest from "@/services/api-request";
import { LoginModel, loginModelTypes, registerSchema, registerSchemaType } from "@/utils/schema/userSchema";
import { setCookie } from "./session";
import { userSessionType } from "@/models/auth/session-model";

export type accountProvider = "Credentials" | "Google" | "Discord";

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
      provider: "Credentials" as accountProvider
    }
    const login = await apiRequest<typeof data, userSessionType>('post', '/auth/login', data);
    if (!login.data) {
      return { error: login.error };
    }
    await setCookie(login.data);
    return { success: login.success, data: login.data, error: login.error }
  } catch (error) {
    return { error: `An unexpected error occurred, ${error}` }
  }
}