import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold">Next.js + Better Auth</h1>
        <p className="mt-2 text-black/60 dark:text-white/60">
          A generic starter with email/password auth, Drizzle ORM, and SQLite.
        </p>
      </div>

      {session ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm">
            Signed in as{" "}
            <span className="font-medium">{session.user.email}</span>
          </p>
          <Link
            href="/dashboard"
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium"
          >
            Go to dashboard
          </Link>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            href="/signin"
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
          >
            Sign up
          </Link>
        </div>
      )}
    </main>
  );
}
