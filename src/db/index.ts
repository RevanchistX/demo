import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "node:path";
import * as schema from "./schema";

// Resolve against the project root so the path is stable regardless of where
// the bundled server chunk executes from (dev/turbopack vs. next start).
const dbPath = process.env.DATABASE_URL ?? path.join(process.cwd(), "sqlite.db");

const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });
