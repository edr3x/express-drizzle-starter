import { db } from "@/db/connect";
import { posts, InsertPost } from "@/db/schema/posts";

import { CreatePostInput } from "./post.schema";
import { eq } from "drizzle-orm";

export async function createPost(userId: string, post: CreatePostInput) {
    const newPost = {
        title: post.title,
        description: post.description,
        userId,
    } satisfies InsertPost;

    await db.insert(posts).values(newPost);

    return "Post created successfully";
}

export async function getMyPosts(userId: string) {
    return await db.select().from(posts).where(eq(posts.userId, userId));
}
