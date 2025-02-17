import { db } from "@/lib/db";

export async function getStudentById(studentId: string) {
    try {
        const student = await db.student.findUnique({
            where: { id: studentId },
            include: { user: true, class: true },
        });
        return student
    } catch {
        return null
    }
}

export async function getStudentsByUserId(userId: string) {
    try {
        const students = await db.student.findMany({
            where: { userId },
            include: { user: true, class: true },
        });
        return students
    } catch {
        return []
    }
}

export async function getStudentsByClassId(classId: string) {
    try {
        const students = await db.student.findMany({
            where: { classId },
            include: { user: true, class: true },
        });
        return students
    } catch {
        return []
    }
}

export async function getStudentsBySubClassId(subClassId: string) {
    try {
        const students = await db.student.findMany({
            where: { subClassId },
            include: { user: true, class: true },
        });
        return students
    } catch {
        return []
    }
}

export async function getAllStudents() {
    try {
        const students = await db.student.findMany({
            include: { user: true, class: true },
        });
        return students
    } catch {
        return []
    }
}
