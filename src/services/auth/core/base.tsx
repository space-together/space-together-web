import apiRequest from "@/services/api-request";
import { registerSchema, registerSchemaType } from "@/utils/schema/userSchema";

export const registerAuth = (data :registerSchemaType ) => {
 const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid Register Validation" };
  }

//   const { name, email, password } = validation.data;

  apiRequest<registerSchemaType, string>('post', '/auth/register',data);
}