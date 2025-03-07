"use server";
import {
  onboardingSchema,
  onboardingSchemaTypes,
} from "@/utils/schema/userSchema";

import { db } from "@/lib/db";
import { Gender, UserRole } from "../../../../prisma/prisma/generated";
import { uploadProfilesToCloudinary } from "@/services/cloudinary-service";

export const onboardingAction = async (
  value: onboardingSchemaTypes,
  id: string
) => {
  const validation = onboardingSchema.safeParse(value);

  if (!validation.success) {
    return { error: "Invalid data" };
  }
  const { image, age, phone, gender, role ,} = validation.data;
  if (!Object.values(UserRole).includes(role as UserRole)) {
    return { error: `Invalid role value: ${role}` };
  }

  try {
    let cloudinary: null| string = null

    if(!!image) {
      cloudinary = await uploadProfilesToCloudinary(image)
    }
     
    const user = await db.user.update({
      data: {
        image : cloudinary,
        age : new Date(age),
        phone,
        gender: gender as Gender,
        role: role as UserRole,
      },
      where: { id },
    });

    if (!user) {
      return { error: "User not found" };
    }
    return {success: " account update success", data: user};
  } catch (error) {
    return { error: `Error updating user [${error}]` };
  }
};
