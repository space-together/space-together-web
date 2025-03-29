"use server";
import { getCurrentUser } from "@/services/auth/core/current-user";
import { db } from "@/lib/db"; // Add this line to import the db object

import { postSchema, PostSchemaType } from "@/utils/schema/postSchema";

export const CreatePostAction = async (values: PostSchemaType , classId ?: string) => {
  const validation = postSchema.safeParse(values);

  if (!validation.success) {
    return { error: "invalid values" };
  }

  const { content } = validation.data;

  try {
    const user = await getCurrentUser({ authUser: true })
    if (!user?.id) {
      return { error: "To create class you must be logged in" };
    }


    const create = await db.post.create({
      data: {
        content ,
        user_id: user.id,
        class_id : classId
      },
    });

    if (!create) {
      return { error: "Failed to Post created" };
    }

    return { success: "Post Created", data: create };
  } catch (error) {
    return {
      error: `Something went wrong to create post error is  [${error}]`,
    };
  }
};
