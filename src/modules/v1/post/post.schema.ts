import { z } from "zod";

export const createPostSchema = z.object({
    body: z.object({
        title: z.string().min(1).max(255),
        description: z.string(),
    }),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>["body"];
