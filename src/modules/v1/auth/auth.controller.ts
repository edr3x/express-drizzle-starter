import { Request, Response, NextFunction } from "express";

import { LoginSchema } from "./auth.schema";
import * as authService from "./auth.service";
import { CustomError } from "@/utils/custom_error";

export async function login(
    req: Request<{}, {}, LoginSchema>,
    res: Response,
    next: NextFunction,
) {
    try {
        const response = await authService.login(req.body);

        return res.status(200).json({ success: true, data: response });
    } catch (err) {
        next(err);
    }
}

export async function refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const refToken = req.headers["x-refresh-token"];
        if (!refToken) {
            throw new CustomError(400, "Refresh token is required");
        }
        const response = await authService.refreshToken(refToken as string);

        return res.status(200).json({ success: true, data: response });
    } catch (err) {
        next(err);
    }
}
