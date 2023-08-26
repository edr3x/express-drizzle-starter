import { z } from "zod";

import "dotenv/config";

const envSchema = z.object({
    PORT: z.string().optional(),
    NODE_ENV: z.string().optional(),
    CLIENT_BASE_URL: z.string().url(),
    DATABASE_URL: z.string().startsWith("postgresql://"),
    JWT_ACCESS_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    JWT_PASSWORD_RESET_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRES_IN: z.string().optional(),
    REFRESH_TOKEN_EXPIRES_IN: z.string().optional(),
});

export const env = envSchema.parse(process.env);
