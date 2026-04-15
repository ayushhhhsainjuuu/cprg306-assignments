"use client";

import { useUserAuth } from "../contexts/AuthContext";
import Link from "next/link";

export default function Week10Page() {
  const auth = useUserAuth();
  const user = auth?.user;
  const gitHubSignIn = auth?.gitHubSignIn;
  const firebaseSignOut = auth?.firebaseSignOut;

  const handleLogin = async () => {
    try {
      await gitHubSignIn?.();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Week 10 - Firestore Shopping List</h1>

      {!user ? (
        <>
          <p className="mb-4">Please login to continue</p>
          <button
            onClick={handleLogin}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <p className="mb-4">
            Welcome, {user.displayName || "User"} ({user.email})
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>
            <Link
              href="/week-10/shopping-list"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Go to Shopping List
            </Link>
          </div>
        </>
      )}
    </main>
  );
}