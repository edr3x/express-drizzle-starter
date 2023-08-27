import { eq } from "drizzle-orm";

import hash from "@/lib/hash";
import token from "@/lib/token";
import { db } from "@/db/connect";
import { users } from "@/db/schema/users";
import { CustomError } from "@/utils/custom_error";
import { DecodedToken, LoginSchema } from "./auth.schema";

export async function login({ email, password }: LoginSchema) {
    const user = await db
        .select({ id: users.id, password: users.password, role: users.role })
        .from(users)
        .where(eq(users.email, email));

    if (user.length === 0) {
        throw new CustomError(404, "User not found, Login instead");
    }

    const isPasswordCorrect = await hash.compare(password, user[0].password);

    if (!isPasswordCorrect) throw new CustomError(401, "Invalid credentials");

    const acccessToken = token.generate({
        payload: {
            id: user[0].id,
            role: user[0].role,
        },
        tokenType: "access",
    });

    const refreshToken = token.generate({
        payload: {
            id: user[0].id,
            role: user[0].role,
        },
        tokenType: "refresh",
    });

    return {
        acccessToken,
        refreshToken,
    };
}

export async function refreshToken(refToken: string) {
    try {
        const isValid = token.verify({
            token: refToken,
            tokenType: "refresh",
        });

        const tokenPayload = isValid as DecodedToken;

        const accessToken = token.generate({
            payload: {
                id: tokenPayload.id,
                role: tokenPayload.role,
            },
            tokenType: "access",
        });

        return { accessToken };
    } catch (err) {
        throw new CustomError(401, "Unauthorized");
    }
}
