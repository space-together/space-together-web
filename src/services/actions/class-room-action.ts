"use server";

import { db } from "@/lib/db";
import {
  classRoomSchema,
  classRoomSchemaType,
} from "@/utils/schema/classRoomSchema";
import { ClassRoomType } from "../../../prisma/prisma/generated";
import { generateCode } from "@/utils/functions/characters";

export const createClassRoomAction = async (values: classRoomSchemaType) => {
  const validation = classRoomSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid valuers" };
  }
  const { name, username, description, sector, trade, class_room_type } =
    validation.data as {
      name: string;
      username: string;
      description: string;
      sector: string;
      trade: string;
      class_room_type: ClassRoomType;
    };
  try {
    const create = await db.classRoom.create({
      data: {
        name,
        username,
        description,
        sectorId: sector,
        ClassRoomType: class_room_type,
        tradeId: trade,
        code: generateCode(),
      },
    });

    if (!create) {
      return { error: "Failed to create Education" };
    }

    return { success: "Trade created", data: create };
  } catch (error) {
    return {
      error: `Some this went wong to create Trade error is  [${error}]`,
    };
  }
};
