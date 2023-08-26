import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

export const posts = pgTable("posts", {
    id: varchar("id", { length: 128 })
        .primaryKey()
        .$defaultFn(() => createId()),
    title: varchar("title").notNull(),
    description: text("description").notNull(),
    userId: varchar("user_id", { length: 128 })
        .notNull()
        .references(() => users.id),
});

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;
