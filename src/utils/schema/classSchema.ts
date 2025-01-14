import z from "zod";

export const classSchema = z.object({
    name : z.string().min(1, {
        message : "Class name is required",
    }),
    description : z.string(),
    section : z.string().min(1, {
        message : "Session is required"
    }),
    subjects : z.array(z.string()),
    room : z.string()
})

export type classSchemaType = z.infer<typeof classSchema>