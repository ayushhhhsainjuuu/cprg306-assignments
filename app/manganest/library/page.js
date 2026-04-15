"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db, auth } from "../../utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ThemeToggle from "../components/ThemeToggle";

export default function LibraryPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function fetchLibrary() {
      setLoading(true);
      try {
        const ref = collection(db, "users", user.uid, "library");
        const snap = await getDocs(ref);
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        items.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
        setLibrary(items);
      } catch (err) {
        console.error("Failed to fetch library:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLibrary();
  }, [user]);

  const handleRemove = async (malId) => {
    if (!user) return;
    setRemoving(malId);
    try {
      await deleteDoc(doc(db, "users", user.uid, "library", String(malId)));
      setLibrary((prev) => prev.filter((m) => String(m.mal_id) !== String(malId)));
    } catch (err) {
      console.error("Remove error:", err);
    } finally {
      setRemoving(null);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/manganest");
  };

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-primary)" }}
      >
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "var(--accent) transparent var(--accent) var(--accent)" }}
        />
      </div>
    );
  }

  return (
    <main
        data-page="manganest"
      className="min-h-screen transition-colors duration-200"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200"
        style={{
          background: "color-mix(in srgb, var(--bg-primary) 90%, transparent)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          {/* Logo */}
          <Link href="/manganest" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌸</span>
            <span
              className="text-2xl font-bold tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--text-primary)" }}
            >
              MangaNest
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Nav buttons */}
          <nav className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            <Link
              href="/manganest/library"
              className="text-sm px-3 py-1.5 rounded-full border transition-colors"
              style={{
                color: "var(--accent)",
                borderColor: "var(--accent)",
                background: "var(--accent-soft)",
              }}
            >
              Library
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span
                  className="text-xs hidden sm:block max-w-[120px] truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm px-3 py-1.5 rounded-full border transition-colors"
                  style={{
                    color: "var(--text-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/manganest/login"
                className="text-sm font-semibold text-white px-4 py-1.5 rounded-full transition-colors"
                style={{ background: "var(--accent)" }}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold tracking-wider"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--text-primary)" }}
          >
            My Library
          </h1>
          {user && !loading && (
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {library.length} manga saved
            </p>
          )}
        </div>

        {/* Not signed in */}
        {!user && (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <span className="text-6xl">📚</span>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--text-primary)" }}
            >
              Your library is waiting
            </h2>
            <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
              Sign in to save manga and build your personal collection.
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                href="/manganest/login"
                className="px-6 py-2.5 text-white text-sm font-semibold rounded-full transition-colors"
                style={{ background: "var(--accent)" }}
              >
                Sign In
              </Link>
              <Link
                href="/manganest/signup"
                className="px-6 py-2.5 text-sm font-semibold rounded-full border transition-colors"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-subtle)",
                  background: "var(--bg-secondary)",
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {user && loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden animate-pulse border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
              >
                <div className="h-56" style={{ background: "var(--skeleton)" }} />
                <div className="p-4 space-y-2">
                  <div className="h-4 rounded w-3/4" style={{ background: "var(--skeleton)" }} />
                  <div className="h-3 rounded w-1/2" style={{ background: "var(--skeleton)" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty library */}
        {user && !loading && library.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <span className="text-6xl">🗂️</span>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--text-primary)" }}
            >
              Nothing saved yet
            </h2>
            <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
              Browse manga and hit Save to Library to add them here.
            </p>
            <Link
              href="/manganest"
              className="mt-2 px-6 py-2.5 text-white text-sm font-semibold rounded-full transition-colors"
              style={{ background: "var(--accent)" }}
            >
              Browse Manga
            </Link>
          </div>
        )}

        {/* Library grid */}
        {user && !loading && library.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {library.map((manga) => (
              <LibraryCard
                key={manga.mal_id}
                manga={manga}
                removing={removing === manga.mal_id}
                onRemove={() => handleRemove(manga.mal_id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function LibraryCard({ manga, removing, onRemove }) {
  const [imgError, setImgError] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const scoreColor =
    manga.score >= 8
      ? "var(--score-high)"
      : manga.score >= 6
      ? "var(--score-mid)"
      : "var(--score-low)";

  return (
    <article
      className="group relative rounded-xl overflow-hidden transition-all duration-300 border"
      style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-accent)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 0 24px var(--card-hover-shadow)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Cover */}
      <Link href={`/manganest/manga/${manga.mal_id}`} className="block relative h-56 overflow-hidden">
        <Image
          src={imgError ? "/placeholder-manga.png" : manga.image || "/placeholder-manga.png"}
          alt={manga.title_english || manga.title}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--bg-card) 0%, transparent 50%)" }}
        />
        {manga.score > 0 && (
          <span
            className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.65)", color: scoreColor }}
          >
            ★ {manga.score}
          </span>
        )}
      </Link>

      {/* Card body */}
      <div className="p-3 space-y-2">
        <h2
          className="text-sm font-semibold leading-tight line-clamp-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "15px",
            letterSpacing: "0.05em",
            color: "var(--text-primary)",
          }}
        >
          {manga.title_english || manga.title}
        </h2>

        {manga.genres?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {manga.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                {g}
              </span>
            ))}
          </div>
        )}

        {/* Remove button */}
        {!confirmRemove ? (
          <button
            onClick={() => setConfirmRemove(true)}
            className="w-full mt-1 py-1.5 rounded-lg text-xs border border-transparent transition-all"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f87171";
              e.currentTarget.style.borderColor = "#7f1d1d";
              e.currentTarget.style.background = "rgba(127,29,29,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Remove
          </button>
        ) : (
          <div className="flex gap-1 mt-1">
            <button
              onClick={() => { onRemove(); setConfirmRemove(false); }}
              disabled={removing}
              className="flex-1 py-1.5 rounded-lg text-xs border transition-all disabled:opacity-50"
              style={{
                background: "rgba(127,29,29,0.4)",
                borderColor: "#be123c",
                color: "#fda4af",
              }}
            >
              {removing ? "..." : "Confirm"}
            </button>
            <button
              onClick={() => setConfirmRemove(false)}
              className="flex-1 py-1.5 rounded-lg text-xs border transition-all"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </article>
  );
}