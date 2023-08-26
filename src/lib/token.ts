import jwt from "jsonwebtoken";

import config from "@/config";

type GenerateOptions = {
    payload: string | object | Buffer;
    tokenType: "access" | "refresh" | "passwordReset";
};

type VerifyOptions = {
    token: string;
    tokenType: GenerateOptions["tokenType"];
};

function selectFunc(tokenType: GenerateOptions["tokenType"]) {
    if (tokenType === "refresh") {
        return {
            secret: config.jwt.refresh.secret,
            expiresIn: config.jwt.refresh.expiresIn || "1y",
        };
    }
    if (tokenType === "passwordReset") {
        return {
            secret: config.jwt.passwordReset.secret,
            expiresIn: config.jwt.passwordReset.expiresIn || "1d",
        };
    }
    return {
        secret: config.jwt.access.secret,
        expiresIn: config.jwt.access.expiresIn || "1d",
    };
}

function generate({ payload, tokenType }: GenerateOptions): string {
    const { expiresIn, secret } = selectFunc(tokenType);

    return jwt.sign(payload, secret, {
        expiresIn,
        algorithm: "HS256",
        subject: tokenType,
    });
}

function verify({ token, tokenType }: VerifyOptions): string | jwt.JwtPayload {
    const { secret } = selectFunc(tokenType);

    return jwt.verify(token, secret, {
        algorithms: ["HS256"],
        subject: tokenType,
    });
}

export default {
    verify,
    generate,
    err: jwt.JsonWebTokenError,
    expired: jwt.TokenExpiredError,
};
