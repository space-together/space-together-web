import { db } from "@/lib/db";

export const getSendUserRequestById = async (id: string) => {
    try {
        const request = await db.sendUserRequest.findUnique({ where: { id } });
        return request;
    } catch {
        return null;
    }
};

export const getAllSendUserRequest = async () => {
    try {
        const requests = await db.sendUserRequest.findMany();
        return requests;
    } catch {
        return [];
    }
};

export const getSendUserRequestByUserId = async (id: string) => {
    try {
        const request = await db.sendUserRequest.findMany({ where: { user_id: id }, orderBy: { created_at: 'desc' } });

        return request;
    } catch {
        return null;
    }
};

export const getSendUserRequestByClassId = async (id: string) => {
    try {
        const request = await db.sendUserRequest.findMany({ where: { class_id: id } });
        return request;
    } catch {
        return null;
    }
};

export const getSendUserRequestBySenderId = async (id: string) => {
    try {
        const request = await db.sendUserRequest.findMany({ where: { senderId: id } });
        return request;
    } catch {
        return null;
    }
};
