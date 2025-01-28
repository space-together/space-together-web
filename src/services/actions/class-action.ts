"use server";

import { db } from "@/lib/db";
import { ClassType } from "../../../prisma/prisma/generated";
import { generateCode } from "@/utils/functions/characters";
import { classSchema, classSchemaType } from "@/utils/schema/classSchema";

export const createClassAction = async (values: classSchemaType) => {
  const validation = classSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid valuers" };
  }
  const { name, username, description, sector, class_teacher, trade, class_room, class_type ,} =
    validation.data as {
      name: string;
      username: string;
      description: string;
      sector: string;
      trade: string;
      class_room: string;
      class_type: ClassType;
      class_teacher : string;
    };
  try {
    const create = await db.class.create({
      data: {
        name,
        username,
        description,
        sectorId: sector,
        classRoomId: class_room,
        tradeId: trade,
        code: generateCode(),
        classType: class_type,
        classTeacher: class_teacher,
      },
    });

    if (!create) {
      return { error: "Failed to create Class" };
    }

    return { success: "class created", data: create };
  } catch (error) {
    return {
      error: `Some this went wong to create class error is  [${error}]`,
    };
  }
};
