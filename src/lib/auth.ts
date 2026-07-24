import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  // Drizzle ORM over libSQL (Turso in prod, a local file in dev). libSQL is
  // SQLite-dialect, so the provider stays "sqlite".
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),

  // Email + password auth enabled out of the box.
  emailAndPassword: {
    enabled: true,
  },

  // Add social providers here, e.g.:
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  // },
});
