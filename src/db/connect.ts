import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";

import config from "@/config";

const queryClient = postgres(config.database.postgres.url);

export const db: PostgresJsDatabase = drizzle(queryClient);
