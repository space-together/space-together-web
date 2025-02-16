import { db } from "@/lib/db";

export async function getStudentById(studentId: string) {
    return await db.student.findUnique({
        where: { id: studentId },
        include: { user: true, class: true },
    });
}

export async function getStudentsByUserId(userId: string) {
    return await db.student.findMany({
        where: { userId },
        include: { user: true, class: true },
    });
}

export async function getStudentsByClassId(classId: string) {
    return await db.student.findMany({
        where: { classId },
        include: { user: true, class: true },
    });
}

export async function getStudentsBySubClassId(subClassId: string) {
    return await db.student.findMany({
        where: { subClassId },
        include: { user: true, class: true },
    });
}

export async function getAllStudents() {
    return await db.student.findMany({
        include: { user: true, class: true },
    });
}
