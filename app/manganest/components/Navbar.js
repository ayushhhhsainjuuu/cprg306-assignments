"use client";

import Link from "next/link";
import { useUserAuth } from "@/app/contexts/AuthContext";

export default function Navbar({ toggleTheme, darkMode }) {
  const { user, firebaseSignOut } = useUserAuth();

  return (
    <nav className="w-full border-b border-purple-900/30 bg-white/70 dark:bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/manganest" className="text-2xl font-extrabold">
          <span className="text-black dark:text-white">Manga</span>
          <span className="text-purple-500">Nest</span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          <Link href="/manganest">Home</Link>
          <Link href="/manganest/library">Library</Link>

          {/*  AUTH PART */}
          {!user ? (
            <Link href="/manganest/login">Login</Link>
          ) : (
            <>
              <span className="text-sm text-purple-400">
                {user.email}
              </span>

              <button
                onClick={firebaseSignOut}
                className="px-3 py-1 bg-red-500 rounded text-white text-sm"
              >
                Logout
              </button>
            </>
          )}

          {/*  THEME BUTTON */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-purple-600 text-white text-sm rounded"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

      </div>
    </nav>
  );
}