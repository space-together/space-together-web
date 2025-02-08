import Z from 'zod';

export const postSchema = Z.object({
    post: Z
    .string()
    .min(1, {
        message: "post required",
    })
    .max(200, {
        message: "maximum character is 200",
    }),
    file: Z
    .string()

});

export type PostSchemaType = Z.infer<typeof postSchema>