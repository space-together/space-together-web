import { db } from "@/lib/db";

export const getClassRoomById = async (id: string) => {
  try {
    const classRoom = await db.classRoom.findUnique({ where: { id } });
    return classRoom;
  } catch {
    return null;
  }
};

export const getClassRoomByUsername = async (username: string) => {
  try {
    const classRoom = await db.classRoom.findUnique({ where: { username } });
    return classRoom;
  } catch {
    return null;
  }
};

export const getAllClassRoom = async () => {
  try {
    const classRooms = await db.classRoom.findMany();
    return classRooms;
  } catch {
    return [];
  }
};

export const getAllClassRoomBySectorId = async (sector_id: string) => {
  try {
    const classRooms = await db.classRoom.findMany({
      where: { sector_id },
    });
    return classRooms;
  } catch {
    return [];
  }
};

export const getAllClassRoomByTradeId = async (tradeId: string) => {
  try {
    const classRooms = await db.classRoom.findMany({
      where: { tradeId },
    });
    return classRooms;
  } catch {
    return [];
  }
};