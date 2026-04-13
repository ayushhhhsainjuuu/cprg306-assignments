"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { useUserAuth } from "@/app/contexts/AuthContext";

export default function LoginPage() {
  const { logIn, googleSignIn } = useUserAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);
      router.push("/manganest");
    } catch (err) {
      setError("Invalid email or password.");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      await googleSignIn();
      router.push("/manganest");
    } catch (err) {
      setError("Google sign-in failed.");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0814] text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0px, transparent 28px, rgba(147,51,234,0.18) 29px, transparent 30px)",
        }}
      />

      <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-700/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-purple-500/50 bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/40 bg-[#151124] text-2xl font-black text-purple-400">
            M
          </div>
        </div>

        <h1 className="text-center text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
          <span className="block text-white">Welcome To</span>
          <span className="block text-purple-500">MangaNest</span>
        </h1>

        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-[2px] w-12 bg-purple-500/70" />
          <div className="h-3 w-3 rotate-45 bg-purple-500" />
          <div className="h-[2px] w-12 bg-purple-500/70" />
        </div>

        <p className="mb-8 text-center text-base text-gray-400 md:text-lg">
          Log in or create an account to start building your manga library.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mb-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-lg font-medium text-gray-700 transition hover:scale-[1.01]"
          >
            <span className="text-xl font-bold text-[#4285F4]">G</span>
            Continue with Google
          </button>

          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm font-semibold tracking-[0.2em] text-gray-500">
              OR
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-lg text-gray-300">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-gray-400">
              <Mail size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-lg text-gray-300">Password</label>
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Forgot password?
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-gray-400">
              <Lock size={20} />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 px-5 py-4 text-xl font-bold text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] transition hover:scale-[1.01] hover:from-purple-400 hover:to-purple-500"
          >
            Log In
          </button>

          <p className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/manganest/signup"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Sign up
            </Link>
          </p>
        </form>

        <p className="mt-8 text-sm tracking-wide text-gray-500">
          MANGANEST © 2026
        </p>
      </div>
    </div>
  );
}