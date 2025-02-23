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

export async function getStudentsByUserId(user_id: string) {
    try {
        const students = await db.student.findMany({
            where: { user_id },
            include: { user: true, class: true },
        });
        return students
    } catch {
        return []
    }
}

export async function getStudentsByClassId(class_id: string) {
    try {
        const students = await db.student.findMany({
            where: { class_id },
            include: { user: true, class: true },
        });
        return students
    } catch {
        return []
    }
}

export async function getStudentsBySubClassId(subClass_id: string) {
    try {
        const students = await db.student.findMany({
            where: { subClass_id },
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
