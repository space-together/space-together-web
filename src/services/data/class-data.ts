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
    const Class = await db.class.findFirst({ where: { username }, orderBy: { created_at: 'desc' }, });
    return Class;
  } catch {
    return null;
  }
};

export const getAllClasses = async () => {
  try {
    const classes = await db.class.findMany({ orderBy: { created_at: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getAllClassesByUserId = async (id: string) => {
  try {
    const classes = await db.class.findMany({ where: { user_id: id }, orderBy: { created_at: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesBySectorId = async (sector_id: string) => {
  try {
    const classes = await db.class.findMany({ where: { sector_id }, orderBy: { created_at: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByTradeId = async (trade_id: string) => {
  try {
    const classes = await db.class.findMany({ where: { trade_id }, orderBy: { created_at: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByStudentId = async (studentId: string) => {
  try {
    const classes = await db.class.findMany({ where: { students: { has: studentId } }, orderBy: { created_at: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByTeacherId = async (teacherId: string) => {
  try {
    const classes = await db.class.findMany({ where: { teachers_ids: { has: teacherId } }, orderBy: { created_at: 'desc' }, });
    return classes;
  } catch {
    return [];
  }
};

export const getClassesByClassRoomId = async (class_room_id: string) => {
  try {
    const classes = await db.class.findMany({ where: { class_room_id }, orderBy: { created_at: 'desc' }, });
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
        user_id: userId,
      },
    });

    if (classOwner) return true;

    const student = await db.student.findFirst({
      where: {
        user_id: userId,
        class_id: classId,
      },
    });

    if (student) return true;

    const teacher = await db.teacher.findFirst({
      where: {
        user_id: userId,
        classes_ids: {
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
