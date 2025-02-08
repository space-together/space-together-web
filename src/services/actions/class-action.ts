"use server";

import { db } from "@/lib/db";
import { ClassType } from "../../../prisma/prisma/generated";
import { generateCode, generateUsername } from "@/utils/functions/characters";
import {
  classSchema,
  classSchemaType,
  classUpdateNameSchema,
  classUpdateNameSchemaType,
  classUpdateSymbolSchema,
  classUpdateSymbolSchemaType,
  classUpdateUsernameSchema,
  classUpdateUsernameSchemaType,
} from "@/utils/schema/classSchema";
import { auth } from "@/auth";

export async function createClassAction(values: classSchemaType) {
  const validation = classSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, sector, trade, class_room, class_type } =
    validation.data as {
      name: string;
      username: string;
      description: string;
      sector: string;
      trade: string;
      class_room: string;
      class_type: ClassType;
      class_teacher: string;
    };
  let myUsername = username;
  if (!username) {
    myUsername = generateUsername(name);
  }
  try {
    const user = (await auth())?.user;
    if (!user?.id) {
      return { error: "To create class you must me login" };
    }
    const createdClass = await db.class.create({
      data: {
        name,
        username: myUsername,
        description,
        sectorId: sector,
        classRoomId: class_room,
        tradeId: trade,
        code: generateCode(),
        classType: class_type,
        userId: user?.id,
      },
    });

    return createdClass
      ? { success: "Class created", data: createdClass }
      : { error: "Failed to create Class" };
  } catch (error) {
    return { error: `Error creating class: [${error}]` };
  }
}

export async function updateClassAction(id: string, values: classSchemaType) {
  const validation = classSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, sector, trade, class_room, class_type } =
    validation.data as {
      name: string;
      username: string;
      description: string;
      sector: string;
      trade: string;
      class_room: string;
      class_type: ClassType;
      class_teacher: string;
    };

  try {
    const user = (await auth())?.user;
    if (!user?.id) {
      return { error: "To create class you must me login" };
    }

    const updatedClass = await db.class.update({
      where: { id },
      data: {
        name,
        username,
        description,
        sectorId: sector,
        classRoomId: class_room,
        tradeId: trade,
        classType: class_type,
        userId: user.id,
      },
    });

    return updatedClass
      ? { success: "Class updated", data: updatedClass }
      : { error: "Failed to update Class" };
  } catch (error) {
    return { error: `Error updating class: [${error}]` };
  }
}

export async function deleteClassAction(id: string) {
  try {
    const deletedClass = await db.class.delete({
      where: { id },
    });

    return deletedClass
      ? { success: "Class deleted", data: deletedClass }
      : { error: "Failed to delete Class" };
  } catch (error) {
    return { error: `Error deleting class: [${error}]` };
  }
}

export const updateClassNameAction = async (
  id: string,
  value: classUpdateNameSchemaType
) => {
  const validation = classUpdateNameSchema.safeParse(value);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name } = validation.data;

  try {
    const updateClass = await db.class.update({
      where: { id },
      data: { name },
    });

    return updateClass
      ? { success: "Class name updated", data: updateClass }
      : { error: "Failed to update Class" };
  } catch (error) {
    return { error: `Error updating class: [${error}]` };
  }
};

export const updateClassusernameAction = async (
  id: string,
  value: classUpdateUsernameSchemaType
) => {
  const validation = classUpdateUsernameSchema.safeParse(value);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { username } = validation.data;
  try {
    const updateClass = await db.class.update({
      where: { id },
      data: { username },
    });

    return updateClass
      ? { success: "Class username updated", data: updateClass }
      : { error: "Failed to update Class" };
  } catch (error) {
    return { error: `Error updating class: [${error}]` };
  }
};

export const updateClassSymbolAction = async (
  id: string,
  value: classUpdateSymbolSchemaType
) => {
  const validation = classUpdateSymbolSchema.safeParse(value);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { symbol } = validation.data;
  try {
    const updateClass = await db.class.update({
      where: { id },
      data: { symbol },
    });

    return updateClass
      ? { success: "Class symbol updated", data: updateClass }
      : { error: "Failed to update Class" };
  } catch (error) {
    return { error: `Error updating class: [${error}]` };
  }
};
