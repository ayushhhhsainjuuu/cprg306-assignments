"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getMangaById } from "../../utils/jikan";
import { db, auth } from "../../utils/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function MangaDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Watch auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Fetch manga details
  useEffect(() => {
    if (!id) return;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMangaById(id);
        if (!data) throw new Error("Manga not found.");
        setManga(data);
      } catch (err) {
        setError(err.message || "Failed to load manga.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // Check if already saved
  useEffect(() => {
    if (!user || !id) return;
    async function checkSaved() {
      const ref = doc(db, "users", user.uid, "library", String(id));
      const snap = await getDoc(ref);
      setSaved(snap.exists());
    }
    checkSaved();
  }, [user, id]);

  const handleSaveToggle = async () => {
    if (!user) {
      router.push("/manganest/login");
      return;
    }
    setSaving(true);
    try {
      const ref = doc(db, "users", user.uid, "library", String(id));
      if (saved) {
        await deleteDoc(ref);
        setSaved(false);
      } else {
        await setDoc(ref, {
          mal_id: manga.mal_id,
          title: manga.title,
          title_english: manga.title_english || "",
          image: manga.images?.jpg?.large_image_url || "",
          score: manga.score || 0,
          status: manga.status || "",
          genres: manga.genres?.map((g) => g.name) || [],
          savedAt: new Date().toISOString(),
        });
        setSaved(true);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#090912] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#c084fc] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading manga...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen bg-[#090912] flex items-center justify-center px-4">
        <div className="bg-rose-900/30 border border-rose-700 text-rose-300 rounded-xl px-6 py-5 text-sm max-w-md text-center">
          <p className="text-lg mb-2">⚠️ {error}</p>
          <button
            onClick={() => router.back()}
            className="mt-3 text-xs underline hover:text-white transition-colors"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  if (!manga) return null;

  const {
    title,
    title_english,
    title_japanese,
    images,
    score,
    scored_by,
    rank,
    popularity,
    synopsis,
    genres = [],
    themes = [],
    authors = [],
    status,
    chapters,
    volumes,
    published,
    relations = [],
    url,
  } = manga;

  const displayTitle = title_english || title;
  const coverUrl = images?.jpg?.large_image_url || images?.jpg?.image_url;
  const scoreColor =
    score >= 8 ? "text-emerald-400" : score >= 6 ? "text-yellow-400" : "text-rose-400";

  const publishedStr = published?.string || "Unknown";
  const allTags = [...genres, ...themes];

  return (
    <main className="min-h-screen bg-[#090912] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#090912]/90 backdrop-blur-md border-b border-[#1e1e30]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <span
            className="text-xl font-bold tracking-widest text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            🌸 MangaNest
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero section */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Cover */}
          <div className="shrink-0">
            <div className="relative w-48 h-72 rounded-xl overflow-hidden border border-[#2a2a3d] shadow-[0_0_40px_rgba(192,132,252,0.1)]">
              <Image
                src={imgError ? "/placeholder-manga.png" : coverUrl || "/placeholder-manga.png"}
                alt={`Cover of ${displayTitle}`}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                priority
              />
            </div>

            {/* Save button */}
            <button
              onClick={handleSaveToggle}
              disabled={saving}
              className={`mt-4 w-48 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                saved
                  ? "bg-[#c084fc]/20 border border-[#c084fc] text-[#c084fc] hover:bg-rose-900/30 hover:border-rose-500 hover:text-rose-400"
                  : "bg-[#c084fc] hover:bg-[#a855f7] text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {saving ? "Saving..." : saved ? "✓ Saved to Library" : "+ Save to Library"}
            </button>

            {!user && (
              <p className="text-xs text-gray-500 mt-2 text-center w-48">
                Sign in to save manga
              </p>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1
                className="text-4xl font-bold tracking-wide text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {displayTitle}
              </h1>
              {title !== displayTitle && (
                <p className="text-gray-400 text-sm mt-1">{title}</p>
              )}
              {title_japanese && (
                <p className="text-gray-600 text-xs mt-0.5">{title_japanese}</p>
              )}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 text-sm">
              {score && (
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Score</span>
                  <span className={`text-xl font-bold ${scoreColor}`}>★ {score}</span>
                  {scored_by && (
                    <span className="text-gray-600 text-xs">{scored_by.toLocaleString()} users</span>
                  )}
                </div>
              )}
              {rank && (
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Rank</span>
                  <span className="text-xl font-bold text-white">#{rank}</span>
                </div>
              )}
              {popularity && (
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Popularity</span>
                  <span className="text-xl font-bold text-white">#{popularity}</span>
                </div>
              )}
              {chapters && (
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Chapters</span>
                  <span className="text-xl font-bold text-white">{chapters}</span>
                </div>
              )}
              {volumes && (
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Volumes</span>
                  <span className="text-xl font-bold text-white">{volumes}</span>
                </div>
              )}
            </div>

            {/* Status + Published */}
            <div className="flex flex-wrap gap-3 text-xs">
              {status && (
                <span className="px-3 py-1 rounded-full bg-[#1e1e30] border border-[#2a2a3d] text-[#c084fc]">
                  {status}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-[#1e1e30] border border-[#2a2a3d] text-gray-400">
                {publishedStr}
              </span>
            </div>

            {/* Genres + Themes */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allTags.map((g) => (
                  <span
                    key={g.mal_id}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#1a1a2e] border border-[#3b3b5c] text-[#a78bfa]"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Authors */}
            {authors.length > 0 && (
              <div className="text-sm text-gray-400">
                <span className="text-gray-600 text-xs uppercase tracking-wider mr-2">Authors</span>
                {authors.map((a, i) => (
                  <span key={a.mal_id}>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c084fc] hover:underline"
                    >
                      {a.name}
                    </a>
                    {i < authors.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}

            {/* MAL link */}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-gray-500 hover:text-[#c084fc] transition-colors underline"
              >
                View on MyAnimeList ↗
              </a>
            )}
          </div>
        </div>

        {/* Synopsis */}
        {synopsis && (
          <section className="mb-10">
            <h2
              className="text-xl font-bold tracking-wider text-white mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Synopsis
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {synopsis}
            </p>
          </section>
        )}

        {/* Related Manga */}
        {relations.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-xl font-bold tracking-wider text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Related
            </h2>
            <div className="space-y-3">
              {relations.map((rel, i) => (
                <div key={i} className="bg-[#0f0f1a] border border-[#1e1e30] rounded-xl px-4 py-3">
                  <p className="text-xs text-[#c084fc] uppercase tracking-wider mb-1">
                    {rel.relation}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {rel.entry.map((entry) => (
                      <a
                        key={entry.mal_id}
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 hover:text-white transition-colors hover:underline"
                      >
                        {entry.name}
                        <span className="text-gray-600 text-xs ml-1">({entry.type})</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}