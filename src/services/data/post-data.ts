import { db } from "@/lib/db";

export const getPostById = async (id: string) => {
  try {
    const Post = await db.post.findUnique({ where: { id } });
    return Post;
  } catch {
    return null;
  }
};

export const getPostByUserId = async (user_id: string) => {
  try {
    const Post = await db.post.findFirst({ where: { user_id } });
    return Post;
  } catch {
    return null;
  }
};

export const getAllPost = async () => {
  try {
    const PostList = await db.post.findMany();
    return PostList;
  } catch {
    return [];
  }
};