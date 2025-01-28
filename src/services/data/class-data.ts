import { db } from "@/lib/db";

export const getClassById = async (id: string) => {
  try {
    const classRoom = await db.class.findUnique({ where: { id } });
    return classRoom;
  } catch {
    return null;
  }
};

export const getClassByUsername = async (username: string) => {
    try {
        const classRoom = await db.class.findFirst({ where: { username } });
        return classRoom;
    } catch {
        return null;
    }
};

export const getAllClasses = async () => {
    try {
        const classes = await db.class.findMany();
        return classes;
    } catch {
        return [];
    }
};