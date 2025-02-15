"use server";

import { db } from "@/lib/db";
import { ClassType } from "../../../prisma/prisma/generated";
import { generateCode, generateUsername } from "@/utils/functions/characters";
import {
  classSchema,
  classSchemaType,
  classUpdateSchema,
  classUpdateSchemaType,
} from "@/utils/schema/classSchema";
import { auth } from "@/auth";
import { uploadSymbolToCloudinary } from "../cloudinary-service";

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

export async function updateClassAction(values: classUpdateSchemaType, id: string) {
  const validation = classUpdateSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, symbol } = validation.data;

  try {
    const cloudinary = await uploadSymbolToCloudinary(symbol);
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
        symbol: cloudinary,
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
