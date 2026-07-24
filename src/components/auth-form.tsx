"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = isSignup
      ? await signUp.email({ name, email, password })
      : await signIn.email({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/10 dark:border-white/15 p-6 shadow-sm">
      <h1 className="text-xl font-semibold mb-1">
        {isSignup ? "Create an account" : "Welcome back"}
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        {isSignup
          ? "Sign up with your email and a password."
          : "Sign in with your email and password."}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/40 dark:focus:border-white/50"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/40 dark:focus:border-white/50"
        />
        <input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/40 dark:focus:border-white/50"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-foreground text-background px-3 py-2 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Please wait…" : isSignup ? "Sign up" : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-black/60 dark:text-white/60">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
