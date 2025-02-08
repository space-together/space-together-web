import Z from "zod";

export const NoteSchema = Z.object({
  name: Z.string()
    .min(1, {
      message: "Notes name required",
    })
    .max(50, {
      message: "Maximum character is 50",
    }),
  description: Z.string()
    .min(1, {
      message: "description required",
    })
    .max(200, {
      message: "maximum character is 200",
    }),
  file: Z.string(),
});

export type NoteSchemaType = Z.infer<typeof NoteSchema>;
