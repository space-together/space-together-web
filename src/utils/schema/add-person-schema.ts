import z from "zod";

export const addPersonSchema = z.object({
  emails: z.array(
    z.object({
      id: z.string(),
      text: z.string().email("Invalid email format"),
    })
  ),
});

export type addPersonSchemaType = z.infer<typeof addPersonSchema>;

export const addTeacherInClassSchema = z.object({
  email : z.string(),
  subjects: z.array(z.string()),
  message : z.string()
})

export type addTeacherInClassSchemaType = z.infer<typeof addTeacherInClassSchema>;