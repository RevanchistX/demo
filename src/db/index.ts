import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// libSQL client. In production set TURSO_DATABASE_URL (+ TURSO_AUTH_TOKEN) to a
// Turso database; locally it falls back to a plain file so no cloud account is
// needed for development.
const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:./local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
