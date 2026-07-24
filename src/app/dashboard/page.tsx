import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-black/10 dark:border-white/15 p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
        <p className="text-sm text-black/60 dark:text-white/60 mb-4">
          You are signed in. This page is rendered on the server and protected
          by the session.
        </p>

        <dl className="text-sm space-y-1 mb-6">
          <div className="flex gap-2">
            <dt className="text-black/50 dark:text-white/50 w-16">Name</dt>
            <dd>{session.user.name}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-black/50 dark:text-white/50 w-16">Email</dt>
            <dd>{session.user.email}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-black/50 dark:text-white/50 w-16">User ID</dt>
            <dd className="font-mono text-xs break-all">{session.user.id}</dd>
          </div>
        </dl>

        <SignOutButton />
      </div>
    </main>
  );
}
