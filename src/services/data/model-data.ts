import { db } from "@/lib/db";
import { Module } from "../../../prisma/prisma/generated";

export const getModuleById = async (id: string): Promise<Module | null> => {
    try {
        const model = await db.module.findUnique({ where: { id } });
        return model;
    } catch {
        return null;
    }
};

export const getModuleByTeacherId = async (teacherId: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { teacherId }, orderBy: { createdAt: 'desc' } , include : {Teacher : true , Subject : true , class : true}});
        return models;
    } catch {
        return null;
    }
};

export const getModuleByUserId = async (userId: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleBySubjectId = async (subjectId: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { subjectId }, orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleByClassId = async (classId: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { classId }, orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getAllModule = async (): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ orderBy: { createdAt: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleByTeacherInClassId = async (teacherId: string, classId: string) => {
    try {
        const models = await db.module.findMany({
            where: { teacherId, classId }
        })
        return models
    } catch {
        return []
    }
}

export const getModuleByUserIdInClassId = async (userId: string, classId: string) => {
    try {
        const models = await db.module.findMany({
            where: { userId, classId }
        })
        return models
    } catch {
        return []
    }
}