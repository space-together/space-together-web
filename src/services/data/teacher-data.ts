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
            orderBy: { created_at: 'desc' },
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
            where: { Models_ids: { has: modelId } },
            orderBy: { created_at: 'desc' },
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
            include: { user: true, Subject: true, module: true }, orderBy: { created_at: 'desc' },
        });
        return teachers
    } catch {
        return []
    }
}

export async function getTeachersByClassId(classId: string) {
    try {
        const teachers = await db.teacher.findMany({
            where: { classes_ids: { has: classId } },
            orderBy: { created_at: 'desc' },
            include: { user: true, Subject: true, module: true },
        });
        return teachers
    } catch {
        return []
    }
}

export async function getTeacherByUserId(user_id: string) {
    try {
        const teachers = await db.teacher.findFirst({
            where: { user_id },
            orderBy: { created_at: 'desc' },
            include: { user: true, Subject: true, module: true },
        });
        return teachers
    } catch {
        return []
    }
}
