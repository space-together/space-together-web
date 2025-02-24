"use server";

import { addPersonSchema, addStudentSchemaType, addTeacherInClassSchema, addTeacherInClassSchemaType } from "@/utils/schema/add-person-schema";
import { getUserByEmail } from "../data/user";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getClassById } from "../data/class-data";
import { SendUserRequest } from "../../../prisma/prisma/generated";
import { getModuleByUserId } from "../data/model-data";
import { getTeacherByUserId } from "../data/teacher-data";

export const sendStudentRequestToJoinClass = async (values: addStudentSchemaType, classId: string) => {
    const validation = addPersonSchema.safeParse(values);
    if (!validation.success) return { error: "Invalid values" };

    const { emails, message } = validation.data;

    try {
        const [classDetails, authResult] = await Promise.all([
            getClassById(classId),
            auth()
        ]);

        if (!classDetails) return { error: "Class doesn't exist" };
        if (!authResult?.user?.id) return { error: "You must have an account to send a request" };

        const senderId = authResult.user.id;

        const results = await Promise.all(
            emails.map(async (item) => {
                const existingUser = await getUserByEmail(item.text);
                if (!existingUser || existingUser.role !== "STUDENT") {
                    return { warning: `User ${item.text} does not exist or is not a student` };
                }
                await db.sendUserRequest.create({
                    data: {
                        user_id: existingUser.id,
                        role: "STUDENT",
                        senderId,
                        message,
                        type: "STUDENTJOINCLASS",
                        class_id: classDetails.id,
                        description: `Request to join class **${classDetails.name}**`,
                    }
                });
                return { success: `Request sent to ${item.text} ✅` };
            })
        );

        const warnings = results.filter(res => res.warning).map(res => res.warning);
        const successes = results.filter(res => res.success).map(res => res.success);

        if (successes.length === 0) {
            return { error: "No valid students found to send requests." };
        }

        return {
            success: successes.length > 0 ? successes.join("\n ") : undefined,
            warning: warnings.length > 0 ? warnings.join("\n") : undefined
        };
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
        if (!getUser || getUser.role !== "TEACHER") return { warring: "This user does not exist or is not a teacher" };

        const senderId = authResult.user.id;

        const getTeacher = await getTeacherByUserId(getUser.id);
        // Batch insert subjects using Promise.all
        const createSubjects = subjects.map((subjectId) =>
            db.module.create({
                data: {
                    class_id: classDetails.id,
                  subject_id :  subjectId,
                   teacher_id: getTeacher && !Array.isArray(getTeacher) ? getTeacher.id : undefined,
                    user_id: getUser.id
                },
            })
        );
        // Create teacher join request
        const createRequest = db.sendUserRequest.create({
            data: {
                message,
                user_id: getUser.id,
                senderId,
                class_id: classDetails.id,
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

        if (!request.user_id) return { error: "Request user does not exist" };

        // Step 2: Handle Teacher Joining Class
        if (request.type === "TEACHERjOINCLASS") {
            let teacher = await db.teacher.findFirst({ where: { user_id: request.user_id } });

            // Explicitly define the type for getModule
            const getModule: { id: string }[] | null = await getModuleByUserId(request.user_id);

            if (teacher) {
                await db.teacher.update({
                    where: { id: teacher.id },
                    data: {
                        Models_ids: getModule ? [...new Set([...teacher.Models_ids, ...getModule.map((m: { id: string }) => m.id)])] : teacher.Models_ids,
                        classes_ids: request.class_id ? [...new Set([...(teacher.classes_ids || []), request.class_id])] : teacher.classes_ids
                    }
                });
            } else {
                if (!getModule) return { error: "You don't have any subjects" };

                teacher = await db.teacher.create({
                    data: {
                        user_id: request.user_id,
                        role: "TEACHER",
                        Models_ids: getModule.map((m: { id: string }) => m.id),
                        classes_ids: request.class_id ? [request.class_id] : undefined
                    }
                });
            }

            // Add teacher to the class in teachersIds array if not already present
            if (request.class_id) {
                const classData = await db.class.findUnique({ where: { id: request.class_id } });

                if (classData && !classData.teachers_ids.includes(teacher.id)) {
                    await db.class.update({
                        where: { id: request.class_id },
                        data: {
                            teachers_ids: [...classData.teachers_ids, teacher.id]  // Use teacher.id instead of request.userId
                        }
                    });
                }
            }
        } else if (request.type === "STUDENTJOINCLASS") {
            let student = await db.student.findFirst({
                where: { user_id: request.user_id, class_id: request.class_id }
            });

            if (!student) {
                // Create a new student entry for this class
                student = await db.student.create({
                    data: {
                        user_id: request.user_id,
                        class_id: request.class_id,
                    }
                });
            }

            // Ensure student is added to the class
            if (request.class_id) {
                const classData = await db.class.findUnique({
                    where: { id: request.class_id },
                    select: { students: true }
                });

                if (classData && !classData.students.includes(student.id)) {
                    await db.class.update({
                        where: { id: request.class_id },
                        data: {
                            students: {
                                set: [...classData.students, student.id]
                            }
                        }
                    });
                }
            }
        }

        return { success: "You have joined the class 🍀" };
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