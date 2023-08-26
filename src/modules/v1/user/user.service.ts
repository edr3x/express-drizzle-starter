import { eq } from "drizzle-orm";

import hash from "@/lib/hash";
import { db } from "@/db/connect";
import { CreateUserSchema } from "./user.schema";
import { CustomError } from "@/utils/custom_error";
import { InsertUser, users } from "@/db/schema/users";

export async function getUserService() {
    return await db
        .select({
            id: users.id,
            fullName: users.fullName,
            email: users.email,
            phone: users.phone,
            role: users.role,
        })
        .from(users);
}

export async function getOneUser(id: string) {
    const userData = await db
        .select({
            id: users.id,
            fullName: users.fullName,
            email: users.email,
            phone: users.phone,
            role: users.role,
        })
        .from(users)
        .where(eq(users.id, id));

    return userData[0];
}

export async function createUserService(body: CreateUserSchema) {
    const userExists = await db
        .select({
            id: users.id,
        })
        .from(users)
        .where(eq(users.email, body.email));

    if (userExists.length > 0) {
        throw new CustomError(409, "User Already Exists");
    }

    const hashedPwd = await hash.generate(body.password);
    const user = {
        email: body.email,
        fullName: body.fullName,
        phone: body.phone,
        password: hashedPwd,
    } satisfies InsertUser;

    await db.insert(users).values(user);

    return "User Created Successfully";
}

export async function deleteUserService(id: string) {
    await db.delete(users).where(eq(users.id, id));

    return "User Deleted Successfully";
}
