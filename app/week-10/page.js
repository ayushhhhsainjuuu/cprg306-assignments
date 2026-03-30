"use client";

import { useUserAuth } from "../contexts/AuthContext";
import Link from "next/link";

export default function Week9Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Week 9 - Firebase Auth</h1>

      {!user ? (
        <>
          <p className="mb-4">Please login to continue</p>
          <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <p className="mb-4">
            Welcome, {user.displayName} ({user.email})
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

            <Link
              href="/week-9/shopping-list"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go to Shopping List
            </Link>
          </div>
        </>
      )}
    </main>
  );
}