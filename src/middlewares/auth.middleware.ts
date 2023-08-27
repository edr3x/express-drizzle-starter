import { Request, Response, NextFunction } from "express";

import token from "@/lib/token";
import { CustomError } from "@/utils/custom_error";

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const tok = req.headers.authorization?.split(" ")[1];
        if (!tok) throw new CustomError(401, "Token Not Found");

        const decodedToken = token.verify({ token: tok, tokenType: "access" });
        res.locals.user = decodedToken;
        next();
    } catch (err) {
        next(new CustomError(401, "Unauthorized"));
    }
}

export async function requireAdmin(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const user = res.locals.user;

        if (user.role !== "admin") {
            throw new CustomError(403, "Forbidden Access");
        }

        next();
    } catch (err) {
        next(err);
    }
}
