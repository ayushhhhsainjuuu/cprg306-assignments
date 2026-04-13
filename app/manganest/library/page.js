"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/contexts/AuthContext";

export default function LibraryPage() {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/manganest/login");
    }
  }, [user]);

  if (!user) return <p className="p-6">Redirecting...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        My Library
      </h1>

      <p className="mt-4 text-gray-400">
        Welcome {user.email}
      </p>
    </div>
  );
}