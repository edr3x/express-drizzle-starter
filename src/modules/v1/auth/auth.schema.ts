import { z } from "zod";

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .email("Not a valid email"),

        password: z.string(),
    }),
});

export type LoginSchema = z.TypeOf<typeof loginSchema>["body"];

export type DecodedToken = {
    id: string;
    role: string;
    iat: number;
    exp: number;
    sub: string;
};
