import { Request, Response, NextFunction } from "express";

import * as UserService from "./user.service";
import { CreateUserSchema } from "./user.schema";

export async function getMe(_req: Request, res: Response, next: NextFunction) {
    try {
        const response = await UserService.getMe(res.locals.user.id);

        return res.status(200).json({ success: true, data: response });
    } catch (err: any) {
        next(err);
    }
}

export async function getUser(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const response = await UserService.getUserService();

        return res.status(200).json({ success: true, data: response });
    } catch (err: any) {
        next(err);
    }
}

export async function getUserById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const response = await UserService.getUserById(req.params.id);

        return res.status(200).json({ success: true, data: response });
    } catch (err: any) {
        next(err);
    }
}

export async function createUser(
    req: Request<{}, {}, CreateUserSchema>,
    res: Response,
    next: NextFunction,
) {
    try {
        const response = await UserService.createUserService(req.body);

        return res.status(201).json({ success: true, data: response });
    } catch (err: any) {
        next(err);
    }
}

export async function deleteUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const response = await UserService.deleteUserService(req.params.id);

        return res.status(200).json({ success: true, data: response });
    } catch (err: any) {
        next(err);
    }
}
