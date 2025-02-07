import { db } from "@/lib/db";

export const getClassById = async (id: string) => {
  try {
    const Class = await db.class.findUnique({ where: { id } });
    return Class;
  } catch {
    return null;
  }
};

export const getClassByUsername = async (username: string) => {
  try {
    const Class = await db.class.findFirst({ where: { username } });
    return Class;
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
