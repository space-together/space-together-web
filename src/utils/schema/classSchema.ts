import z from "zod";

export const classSchema = z.object({
    name : z.string().min(1, {
        message : "Class name is requid",
    }),
    description : z.string(),
    section : z.string().min(1, {
        message : "Session is requid"
    }),
    subject : z.string().min(1, {
        message : "Subject is requid"
    })
})

export type classSchemaType = z.infer<typeof classSchema>