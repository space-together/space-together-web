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
    const Class = await db.class.findFirst({ where: { username }, orderBy: { createdAt: 'desc' }, });
    return Class;
  } catch {
    return null;
  }
};

export const getAllClasses = async () => {
  try {
    const classes = await db.class.findMany({ orderBy: { createdAt: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getAllClassesByUserId = async (id: string) => {
  try {
    const classes = await db.class.findMany({ where: { userId: id }, orderBy: { createdAt: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesBySectorId = async (sectorId: string) => {
  try {
    const classes = await db.class.findMany({ where: { sectorId }, orderBy: { createdAt: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByTradeId = async (tradeId: string) => {
  try {
    const classes = await db.class.findMany({ where: { tradeId }, orderBy: { createdAt: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByStudentId = async (studentId: string) => {
  try {
    const classes = await db.class.findMany({ where: { students: { has: studentId } }, orderBy: { createdAt: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByTeacherId = async (teacherId: string) => {
  try {
    const classes = await db.class.findMany({ where: { teachersIds: { has: teacherId } }, orderBy: { createdAt: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByClassRoomId = async (classRoomId: string) => {
  try {
    const classes = await db.class.findMany({ where: { classRoomId }, orderBy: { createdAt: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export async function isUserInClass(userId: string, classId: string): Promise<boolean> {
  try {
    const classOwner = await db.class.findFirst({
      where: {
        id: classId,
        userId: userId,
      },
    });

    if (classOwner) return true;

    const student = await db.student.findFirst({
      where: {
        userId: userId,
        classId: classId,
      },
    });

    if (student) return true;

    const teacher = await db.teacher.findFirst({
      where: {
        userId: userId,
        classesIds: {
          has: classId,
        },
      },
    });

    if (teacher) return true;

    return false;
  } catch {
    return false;
  }
}
