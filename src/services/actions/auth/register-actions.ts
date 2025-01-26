"use server";
import { registerSchema, registerSchemaType } from "@/utils/schema/userSchema";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/data/user";
import { generateUsername } from "@/utils/functions/characters";

export const registerAction = async (values: registerSchemaType) => {
  const validation = registerSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid Register Validation" };
  }

  const { name, email, password } = validation.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: `email already exit [${existingUser.email}], try other email`,
  };
  }

 const create = await db.user.create({
    data: {
      name,
      email,
      username : generateUsername(name),
      password: hashedPassword,
    },
  });
  
  
  if (!create) {
    return { error: "Failed to create account" };
  }

  return { success: "Account created" };
};
