import { db } from "@/lib/db";

export const getEducationById = async (id: string) => {
  try {
    const education = await db.education.findUnique({ where: { id } });
    return education;
  } catch {
    return null;
  }
};

export const getEducationByUsername = async (username: string) => {
  try {
    const education = await db.education.findUnique({ where: { username } });
    return education;
  } catch {
    return null;
  }
};
