"use server";

import { db } from "@/lib/db";
import {
  classRoomSchema,
  classRoomSchemaType,
} from "@/utils/schema/classRoomSchema";
import { ClassRoomType } from "../../../prisma/prisma/generated";
import { generateCode } from "@/utils/functions/characters";
import { getTradeById } from "../data/trade-data";
import sectorService from "../data/sector-data";


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
    const getTrade = await getTradeById(trade);
    let myTrade: null | string = null;
    if (!getTrade) myTrade = null;
    
    const getSector = await sectorService.getSectorById(sector);
    if (!getSector)
      return { error: "Sector is not exit, Please try other Sector" };
    const create = await db.classRoom.create({
      data: {
        name,
        username,
        description,
        sector_id: sector,
        class_room_type,
        trade_id: myTrade,
        code: generateCode(),
      },
    });

    if (!create) {
      return { error: "Failed to create Class room" };
    }

    return { success: "class room created", data: create };
  } catch (error) {
    return {
      error: `Some this went wong to create class room error is  [${error}]`,
    };
  }
};

export const updateClassRoomAction = async (
  id: string,
  values: classRoomSchemaType
) => {
  const validation = classRoomSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
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
    const update = await db.classRoom.update({
      where: { id },
      data: {
        name,
        username,
        description,
        sector_id: sector,
        class_room_type,
        trade_id: trade,
      },
    });

    if (!update) {
      return { error: "Failed to update Class room" };
    }

    return { success: "Class room updated", data: update };
  } catch (error) {
    return {
      error: `Something went wrong while updating class room. Error: [${error}]`,
    };
  }
};

export const deleteClassRoomAction = async (id: string) => {
  try {
    const deleteClassRoom = await db.classRoom.delete({
      where: { id },
    });

    if (!deleteClassRoom) {
      return { error: "Failed to delete Class room" };
    }

    return { success: "Class room deleted", data: deleteClassRoom };
  } catch (error) {
    return {
      error: `Something went wrong while deleting class room. Error: [${error}]`,
    };
  }
};
