"use server";
import { db } from "@/lib/db"; // Add this line to import the db object

import { postSchema, PostSchemaType } from "@/utils/schema/postSchema";

export const CreatePostAction = async (values: PostSchemaType) => {
  const validation = postSchema.safeParse(values);

  if (!validation.success) {
    return { error: "invalid values" };
  }

  const { content, file } = validation.data;

  // TODO : to make file store
  try {
    const create = await db.post.create({
      data: {
        content,
        fileId: file,
      },
    });

    if (!create) {
      return { error: "Failed to create Education" };
    }

    return { success: "Education created", data: create };
  } catch (error) {
    return {
      error: `Some this went wong to create class error is  [${error}]`,
    };
  }
};

