import { db } from "@/lib/db";

export const getSectorById = async (id: string) => {
  try {
    const sector = await db.sector.findUnique({ where: { id } });
    return sector;
  } catch {
    return null;
  }
};

export const getSectorByUsername = async (username: string) => {
  try {
    const sector = await db.sector.findUnique({ where: { username } });
    return sector;
  } catch {
    return null;
  }
};

export const getAllSectors = async () => {
    try {
        const sectors = await db.sector.findMany();
        return sectors;
    } catch {
        return [];
    }
};

export const getSectorsByEducationId = async (educationId: string) => {
  try {
    const sectors = await db.sector.findMany({ where: { educationId } });
    return sectors;
  } catch {
    return [];
  }
};