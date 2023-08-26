import { CorsOptions } from "cors";
import { env } from "./env";

const isProduction = env.NODE_ENV === "prod";

export default {
    app: {
        env: env.NODE_ENV,
        isProduction: isProduction,
        port: env.PORT,
    },
    cors: {
        origin: [
            "http://localhost:8080",
            "http://127.0.0.1:8080",
            env.CLIENT_BASE_URL,
        ],
        credentials: true,
    } as CorsOptions,
    database: {
        postgres: {
            url: env.DATABASE_URL,
        },
    },
    jwt: {
        access: {
            secret: env.JWT_ACCESS_SECRET,
            expiresIn: isProduction ? env.ACCESS_TOKEN_EXPIRES_IN : "1d",
        },
        refresh: {
            secret: env.JWT_REFRESH_SECRET,
            expiresIn: isProduction ? env.REFRESH_TOKEN_EXPIRES_IN : "1y",
        },
        passwordReset: {
            secret: env.JWT_PASSWORD_RESET_SECRET,
            expiresIn: "1d",
        },
    },
};
