"use server";
import apiRequest from "@/services/api-request";
import { registerSchema, registerSchemaType } from "@/utils/schema/userSchema";
import { setCookie } from "./session";
import { cookies } from "next/headers";
import { userSessionType } from "@/models/auth/session-model";

export const registerAuthApi = async (values :registerSchemaType ) => {
 const validation = registerSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid Register Validation" };
  }

 const data = await  apiRequest<registerSchemaType, userSessionType>('post', '/auth/register', validation.data);
 if (!data.data) {
    return { error: data.error };
  }

 setCookie(data.data, await cookies());
  return {success : data.success ,data : data.data , error : data.error};
}