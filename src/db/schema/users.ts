import { createId } from "@paralleldrive/cuid2";
import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const users = pgTable("users", {
    id: varchar("id", { length: 128 })
        .primaryKey()
        .$defaultFn(() => createId()),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    phone: text("phone").notNull(),
    role: roleEnum("role").default("user").notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
