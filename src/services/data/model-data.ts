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

export const getModuleByTeacherId = async (teacher_id: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { teacher_id }, orderBy: { created_at: 'desc' } , include : {Teacher : true , Subject : true , class : true}});
        return models;
    } catch {
        return null;
    }
};

export const getModuleByUserId = async (user_id: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { user_id }, orderBy: { created_at: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleBySubjectId = async (subject_id: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { subject_id }, orderBy: { created_at: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleByClassId = async (class_id: string): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ where: { class_id }, orderBy: { created_at: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getAllModule = async (): Promise<Module[] | null> => {
    try {
        const models = await db.module.findMany({ orderBy: { created_at: 'desc' } });
        return models;
    } catch {
        return null;
    }
};

export const getModuleByTeacherInClassId = async (teacher_id: string, class_id: string) => {
    try {
        const models = await db.module.findMany({
            where: { teacher_id, class_id }
        })
        return models
    } catch {
        return []
    }
}

export const getModuleByUserIdInClassId = async (user_id: string, class_id: string) => {
    try {
        const models = await db.module.findMany({
            where: { user_id, class_id }
        })
        return models
    } catch {
        return []
    }
}