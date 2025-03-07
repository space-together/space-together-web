"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NoteSchema, NoteSchemaType } from "@/utils/schema/note-schema";


export const createNoteAction = async (values: NoteSchemaType, subjectId: string) => {
    const validation = NoteSchema.safeParse(values);

    if (!validation.success) {
        return { error: "Invalid valuers" };
    }
    const { description, content, file } = validation.data;
    try {
        const user = (await auth())?.user;
        if (!user?.id) return {error : "Create account and add notes"};
        const create = await db.note.create({
            data: {
                fileId: file,
                description,
                user_id  : user.id,
                subject_id : subjectId,
                content,
                module_id : subjectId,
            },
        });

        if (!create) {
            return { error: "Failed to create Education" };
        }

        return { success: "Education created", data: create };
    } catch (error) {
        return {
            error: `Some this went wong to create class error is  [${error}]`,
        };
    }
};
export const deleteNoteAction = async (noteId: string) => {
    try {
        const user = (await auth())?.user;
        if (!user?.id) return { error: "Create account and add notes" };

        const note = await db.note.findUnique({
            where: { id: noteId },
        });

        if (!note || note.user_id !== user.id) {
            return { error: "Note not found or unauthorized" };
        }

        await db.note.delete({
            where: { id: noteId },
        });

        return { success: "Note deleted" };
    } catch (error) {
        return {
            error: `Something went wrong while deleting the note. Error: [${error}]`,
        };
    }
};

export const updateNoteAction = async (noteId: string, values: NoteSchemaType) => {
    const validation = NoteSchema.safeParse(values);

    if (!validation.success) {
        return { error: "Invalid values" };
    }
    const { description, content, file } = validation.data;

    try {
        const user = (await auth())?.user;
        if (!user?.id) return { error: "Create account and add notes" };

        const note = await db.note.findUnique({
            where: { id: noteId },
        });

        if (!note || note.user_id !== user.id) {
            return { error: "Note not found or unauthorized" };
        }

        const updatedNote = await db.note.update({
            where: { id: noteId },
            data: {
                fileId: file,
                description,
                content,
            },
        });

        return { success: "Note updated", data: updatedNote };
    } catch (error) {
        return {
            error: `Something went wrong while updating the note. Error: [${error}]`,
        };
    }
};