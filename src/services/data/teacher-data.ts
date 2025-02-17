import { db } from "@/lib/db";

export async function getTeacherById(teacherId: string) {
    try {
        const teacher = await db.teacher.findUnique({
            where: { id: teacherId },
            include: { user: true, Subject: true },
        });
        return teacher
    } catch {
        return null
    }
}

export async function getTeachersByRole(role: "TEACHER" | "CLASSTEACHER") {
    try {
        const teachers = await db.teacher.findMany({
            where: { role },
            orderBy: { createdAt: 'desc' },
            include: { user: true },
        });
        return teachers
    } catch {
        return []
    }
}

export async function getTeachersByModelId(modelId: string) {
    try {
        const teachers = await db.teacher.findMany({
            where: { ModelsIds: { has: modelId } },
            orderBy: { createdAt: 'desc' },
            include: { user: true, module: true },
        });
        return teachers
    } catch {
        return []
    }
}

export async function getAllTeachers() {
    try {
        const teachers = await db.teacher.findMany({
            include: { user: true, Subject: true, module: true }, orderBy: { createdAt: 'desc' },
        });
        return teachers
    } catch {
        return []
    }
}

export async function getTeachersByClassId(classId: string) {
    try {
        const teachers = await db.teacher.findMany({
            where: { classesIds: { has: classId } },
            orderBy: { createdAt: 'desc' },
            include: { user: true, Subject: true, module: true },
        });
        return teachers
    } catch {
        return []
    }
}

export async function getTeacherByUserId(userId: string) {
    try {
        const teachers = await db.teacher.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { user: true, Subject: true, module: true },
        });
        return teachers
    } catch {
        return []
    }
}
