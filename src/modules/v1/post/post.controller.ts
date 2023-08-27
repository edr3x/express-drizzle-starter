import { Request, Response, NextFunction } from "express";

import * as postService from "./post.service";

import { CreatePostInput } from "./post.schema";

export async function createPost(
    req: Request<{}, {}, CreatePostInput>,
    res: Response,
    next: NextFunction,
) {
    try {
        const response = await postService.createPost(
            res.locals.user.id,
            req.body,
        );

        return res.status(201).json({ success: true, data: response });
    } catch (e) {
        next(e);
    }
}

export async function getMyPosts(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const response = await postService.getMyPosts(res.locals.user.id);

        return res.status(200).json({ success: true, data: response });
    } catch (e) {
        next(e);
    }
}
