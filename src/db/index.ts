import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);

// Extra caching because drizzel ORM makes new client everytime we reload the nextjs server, so to fix that
declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(queryClient, { schema });
} else {
  if (!global.db) {
    global.db = drizzle(queryClient, { schema });
  }

  db = global.db;
}

export { db };
