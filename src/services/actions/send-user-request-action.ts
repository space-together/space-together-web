"use server"

import { addPersonSchema, addPersonSchemaType } from "@/utils/schema/add-preson-schema"
import { getUserByEmail } from "../data/user";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getClassById } from "../data/class-data";

export const sendTeachersRequestToJoinClass = async (values: addPersonSchemaType, classId: string) => {
    const validation = addPersonSchema.safeParse(values);

    if (!validation.success) return { error: "Invalid values" };

    const { emails } = validation.data;

    try {
        const getClass = await getClassById(classId);
        if (!getClass) return { error: "class doesn't exit" };
        const userIds: string[] = [];
        const Emails: string[] = [];
        emails.forEach(async item => {
            const getEmail = await getUserByEmail(item.text);
            if (!getEmail) {
                Emails.push(item.text);
            } else {
                userIds.push(getEmail.id)
            }
        });
        const user = (await auth())?.user;
        if (!user?.id) return { error: "you can note sender user request if you don't have account" }

        userIds.forEach(async id => {
            if (user.id) {
                await db.sendUserRequest.create({
                    data: {
                        userId: id,
                        senderId: user.id,
                        description: `Ask to join class **${getClass.name}** `,
                        classId: getClass.id,
                    }
                })
            }
        })

        Emails.forEach(async email => {
            if (user.id) {
                await db.sendUserRequest.create({
                    data: {
                        senderId: user.id,
                        email: email,
                        classId: getClass.id,
                        description: `Ask to join class **${getClass.name}** `,
                    }
                })
            }
        })

        return {success : "Request have sended!"}
    } catch (error) {
        return {
            error: `Something went wrong to sender teacher request error is  [${error}]`,
        };
    }
}