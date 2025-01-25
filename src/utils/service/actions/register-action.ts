"use server";
import { registerSchema, registerSchemaType } from "@/utils/schema/userSchema";

import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user";

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

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: "Account created" };
};
