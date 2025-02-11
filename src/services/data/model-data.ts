import { db } from "@/lib/db";

export const getModuleById = async (id: string) => {
    try {
        const model = await db.module.findUnique({ where: { id } });
        return model;
    } catch {
        return null;
    }
};

export const getModuleByTeacherId = async (teacherId: string) => {
    try {
        const models = await db.module.findMany({ where: { teacherId }, orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleByUserId = async (userId: string) => {
    try {
        const models = await db.module.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleBySubjectId = async (subjectId: string) => {
    try {
        const models = await db.module.findMany({ where: { subjectId }, orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleByClassId = async (classId: string) => {
    try {
        const models = await db.module.findMany({ where: { classId }, orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getAllModule = async () => {
    try {
        const models = await db.education.findMany({ orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return [];
    }
};
