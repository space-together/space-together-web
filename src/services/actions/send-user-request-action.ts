"use server";

import { addPersonSchema, addPersonSchemaType, addTeacherInClassSchema, addTeacherInClassSchemaType } from "@/utils/schema/add-person-schema";
import { getUserByEmail } from "../data/user";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getClassById } from "../data/class-data";
import { SendUserRequest } from "../../../prisma/prisma/generated";
import { getModuleByUserId } from "../data/model-data";
import { getTeacherByUserId } from "../data/teacher-data";

export const sendPeopleRequestToJoinClass = async (values: addPersonSchemaType, classId: string) => {
    const validation = addPersonSchema.safeParse(values);
    if (!validation.success) return { error: "Invalid values" };

    const { emails } = validation.data;

    try {
        // Fetch class details
        const classDetails = await getClassById(classId);
        if (!classDetails) return { error: "Class doesn't exist" };

        // Authenticate user
        const user = (await auth())?.user;
        if (!user?.id) return { error: "You must have an account to send a request" };

        const senderId = user.id;

        // Process emails to check existing users
        const userRequests = await Promise.all(
            emails.map(async (item) => {
                const existingUser = await getUserByEmail(item.text);
                return existingUser
                    ? { userId: existingUser.id, email: null }
                    : { userId: null, email: item.text };
            })
        );

        const userRequestsData = userRequests.map((request) => ({
            userId: request.userId ?? undefined,
            email: request.email ?? undefined,
            senderId,
            classId: classDetails.id,
            description: `Ask to join class **${classDetails.name}**`,

        }));

        // Batch insert requests
        await db.sendUserRequest.createMany({
            data: userRequestsData,
        });

        return { success: "Request has been sent 🍀" };
    } catch (error) {
        return { error: `Failed to send request: [${error}]` };
    }
};
export const sendTeacherRequestToJoinClass = async (
    values: addTeacherInClassSchemaType,
    classId: string
) => {
    // Validate input data
    const validation = addTeacherInClassSchema.safeParse(values);
    if (!validation.success) return { error: "Invalid values" };

    const { email, subjects, message } = validation.data;

    try {
        // Fetch required data in parallel
        const [classDetails, authResult, getUser] = await Promise.all([
            getClassById(classId),
            auth(),
            getUserByEmail(email),
        ]);

        if (!classDetails) return { error: "Class doesn't exist" };
        if (!authResult?.user?.id) return { error: "You must have an account to send a request" };
        if (!getUser || getUser.role !== "TEACHER") return { error: "This user does not exist or is not a teacher" };

        const senderId = authResult.user.id;

        // // Check if there are existing requests in parallel
        // const [getRequestUser, getRequestClass, getModel] = await Promise.all([
        //     getSendUserRequestByUserId(getUser.id),
        //     getSendUserRequestByClassId(getUser.id),
        //     getModuleByUserId(getUser.id)
        // ]);

        // if (!!getRequestClass && !!getRequestUser && !!getModel) {
        //     return { warning: `You have already send request **${getUser.name}** to join **${classDetails.name}** on 😥` };
        // }

        const getTeacher = await getTeacherByUserId(getUser.id);
        // Batch insert subjects using Promise.all
        const createSubjects = subjects.map((subjectId) =>
            db.module.create({
                data: {
                    classId: classDetails.id,
                    subjectId,
                    teacherId : getTeacher ? getTeacher.id : undefined,
                    userId: getUser.id
                },
            })
        );
        // Create teacher join request
        const createRequest = db.sendUserRequest.create({
            data: {
                message,
                userId: getUser.id,
                senderId,
                classId: classDetails.id,
                role: "TEACHER",
                type: "TEACHERjOINCLASS",
                description: `Request to join class **${classDetails.name}**`,
            },
        });

        // Await all operations in parallel
        await Promise.all([...createSubjects, createRequest]);

        return { success: "Request has been sent! 🍀" };
    } catch (error) {
        return { error: `Failed to send teacher request: [${error}]` };
    }
};

export const UserJoinClassRequest = async (request: SendUserRequest) => {
    try {
        // Step 1: Update request status
        await db.sendUserRequest.update({
            where: { id: request.id },
            data: {
                accept: true,
                seen: true
            }
        });

        if (!request.userId) return { error: "Request user does not exist" };

        // Step 2: Handle Teacher Joining Class
        if (request.type === "TEACHERjOINCLASS") {
            let teacher = await db.teacher.findFirst({ where: { userId: request.userId } });

            // Explicitly define the type for getModule
            const getModule: { id: string }[] | null = await getModuleByUserId(request.userId);

            if (teacher) {
                await db.teacher.update({
                    where: { id: teacher.id },
                    data: {
                        ModelsIds: getModule ? [...new Set([...teacher.ModelsIds, ...getModule.map((m: { id: string }) => m.id)])] : teacher.ModelsIds,
                        classesIds: request.classId ? [...new Set([...(teacher.classesIds || []), request.classId])] : teacher.classesIds
                    }
                });
            } else {
                if (!getModule) return { error: "You don't have any subjects" };

                teacher = await db.teacher.create({
                    data: {
                        userId: request.userId,
                        role: "TEACHER",
                        ModelsIds: getModule.map((m: { id: string }) => m.id),
                        classesIds: request.classId ? [request.classId] : undefined
                    }
                });
            }

            // Add teacher to the class in teachersIds array if not already present
            if (request.classId) {
                const classData = await db.class.findUnique({ where: { id: request.classId } });

                if (classData && !classData.teachersIds.includes(teacher.id)) {
                    await db.class.update({
                        where: { id: request.classId },
                        data: {
                            teachersIds: [...classData.teachersIds, teacher.id]  // Use teacher.id instead of request.userId
                        }
                    });
                }
            }
        }

        return { success: "You have joined the class" };
    } catch (error) {
        return { error: `Failed to accept request: [${error}]` };
    }
};




export const deleteUserRequest = async (id: string) => {
    try {
        await db.sendUserRequest.delete({ where: { id: id } })
        return { success: "Request delete successful 🍀" }
    } catch (error) {
        return { error: `Failed to delete request: [${error}]` };
    }
}