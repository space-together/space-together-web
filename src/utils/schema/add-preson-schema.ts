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
