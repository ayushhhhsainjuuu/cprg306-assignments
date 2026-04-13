"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { useUserAuth } from "@/app/contexts/AuthContext";

export default function SignupPage() {
  const { signUp } = useUserAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(email, password);
      router.push("/manganest");
    } catch (err) {
      setError("Failed to create account.");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0814] text-white">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0px, transparent 28px, rgba(147,51,234,0.18) 29px, transparent 30px)",
        }}
      />

      <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-700/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        
        {/* Logo */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-purple-500/50 bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/40 bg-[#151124] text-2xl font-black text-purple-400">
            M
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-5xl font-black uppercase md:text-7xl">
          <span className="block">Create Account</span>
          <span className="block text-purple-500">MangaNest</span>
        </h1>

        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-[2px] w-12 bg-purple-500/70" />
          <div className="h-3 w-3 rotate-45 bg-purple-500" />
          <div className="h-[2px] w-12 bg-purple-500/70" />
        </div>

        <p className="mb-8 text-center text-gray-400">
          Create your account and start tracking your manga.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md"
        >
          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-lg text-gray-300">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
              <Mail size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent text-white outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="mb-2 block text-lg text-gray-300">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
              <Lock size={20} />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-transparent text-white outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 py-4 font-bold text-white"
          >
            Sign Up
          </button>

          {/* Link */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/manganest/login"
              className="text-purple-400 hover:text-purple-300"
            >
              Log in
            </Link>
          </p>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          MANGANEST © 2026
        </p>
      </div>
    </div>
  );
}