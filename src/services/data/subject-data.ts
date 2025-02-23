import { db } from "@/lib/db";

export const getSubjectById = async (id: string) => {
  try {
    const subject = await db.subject.findUnique({ where: { id } });
    return subject;
  } catch {
    return null;
  }
};

export const getSubjectByCode = async (code: string) => {
  try {
    const subject = await db.subject.findUnique({ where: { code } });
    return subject;
  } catch {
    return null;
  }
};

export const getSubjectByClassId = async (class_id: string) => {
  try {
    const subjects = await db.subject.findMany({ where: { class_id } });
    return subjects;
  } catch {
    return null;
  }
};

export const getAllSubject = async () => {
  try {
    const subjectList = await db.subject.findMany();
    return subjectList;
  } catch {
    return [];
  }
};
