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
  try {
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
  } catch (error) {
    return {
      error: `Some this went wong to create class error is  [${error}]`,
    };
  }
};

export const updateEducationAction = async (
  id: string,
  values: educationSchemaType
) => {
  const validation = educationSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid values" };
  }
  const { name, username, description } = validation.data;

  const getUsername = await getEducationByUsername(username);
  if (getUsername && getUsername.id !== id) {
    return {
      error: `Education username is already in use by another record [${getUsername.username}], try another username`,
    };
  }

  const update = await db.education.update({
    where: { id },
    data: {
      name,
      username,
      description,
    },
  });

  if (!update) {
    return { error: "Failed to update Education" };
  }

  return { success: "Education updated", data: update };
};

export const deleteEducationAction = async (id: string) => {
  try {
    const deleteEducation = await db.education.delete({
      where: { id },
    });

    if (!deleteEducation) {
      return { error: "Failed to delete Education" };
    }

    return { success: "Education deleted", data: deleteEducation };
  } catch {
    return { error: "An error occurred while deleting Education" };
  }
};
