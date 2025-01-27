"use server";

import { db } from "@/lib/db";
import { getEducationByUsername } from "@/services/data/education-data";
import {
  educationSchema,
  educationSchemaType,
} from "@/utils/schema/educationSchema";

export const createEducationAction = async (values: educationSchemaType) => {
  const validation = educationSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid valuers" };
  }
  const { name, username, description } = validation.data;
  const getUsername = await getEducationByUsername(username);
  if (!!getUsername) {
    return {
      error: `Education username name is ready exit [${getUsername.username}], try other username`,
    };
  }

  const create = await db.education.create({
    data: {
      name,
      username,
      description,
    },
  });

  if (!create) {
    return { error: "Failed to create Education" };
  }

  return { success: "Education created", data: create };
};
