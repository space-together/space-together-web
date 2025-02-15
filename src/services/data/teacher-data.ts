import { db } from "@/lib/db";

export async function getTeacherById(teacherId: string) {
    return await db.teacher.findUnique({
        where: { id: teacherId },
        include: { user: true, Subject: true },
    });
}

export async function getTeachersByRole(role: "TEACHER" | "CLASSTEACHER") {
    return await db.teacher.findMany({
        where: { role },
        orderBy: { createdAt: 'desc' },
        include: { user: true },
    });
}

export async function getTeachersByModelId(modelId: string) {
    return await db.teacher.findMany({
        where: { ModelsIds: { has: modelId } },
        orderBy: { createdAt: 'desc' },
        include: { user: true, module: true },
    });
}

export async function getAllTeachers() {
    return await db.teacher.findMany({
        include: { user: true, Subject: true, module: true }, orderBy: { createdAt: 'desc' },
    });
}

export async function getTeachersByClassId(classId: string) {
    return await db.teacher.findMany({
        where: { classesIds: { has: classId } },
        orderBy: { createdAt: 'desc' },
        include: { user: true, Subject: true, module: true },
    });
}

export async function getTeacherByUserId(userId: string) {
    return await db.teacher.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: { user: true, Subject: true, module: true },
    });
}
