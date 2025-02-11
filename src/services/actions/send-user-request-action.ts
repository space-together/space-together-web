"use server";

import { addPersonSchema, addPersonSchemaType, addTeacherInClassSchema, addTeacherInClassSchemaType } from "@/utils/schema/add-preson-schema";
import { getUserByEmail } from "../data/user";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getClassById } from "../data/class-data";

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

        // Batch insert subjects using Promise.all
        await Promise.all(
            subjects.map((subjectId) =>
                db.model.create({ // Change model name based on schema
                    data: {
                        teacherId: getUser.id,
                        classId: classDetails.id,
                        subjectId,
                    },
                })
            )
        );

        // Create teacher join request
        await db.sendUserRequest.create({
            data: {
                message,
                userId: getUser.id,
                senderId,
                classId: classDetails.id,
                role: "TEACHER",
                type: "TEACHERjOINCLASS",
                description: `Ask to join class **${classDetails.name}**`,
            },
        });

        return { success: "Request has been sent! 🍀" };
    } catch (error) {
        return { error: `Failed to send teacher request: [${error}]` };
    }
};
