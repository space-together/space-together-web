"use server";
import apiRequest from "@/services/api-request";
import { registerSchema, registerSchemaType } from "@/utils/schema/userSchema";
import { setCookie } from "./session";
import { userSessionType } from "@/models/auth/session-model";

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