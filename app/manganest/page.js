"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MangaCard from "./components/MangaCard";
import ThemeToggle from "./components/ThemeToggle";
import { searchManga } from "../utils/jikan";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const RESULTS_PER_PAGE = 12;
const DEFAULT_QUERY = "one piece";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDefaultView, setIsDefaultView] = useState(true);

  const debounceRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.refresh();
  };

  const fetchData = useCallback(async (searchQuery, page) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchManga(
        searchQuery || DEFAULT_QUERY,
        page,
        RESULTS_PER_PAGE
      );
      setResults(result.data ?? []);
      setPagination(result.pagination ?? {});
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData("", 1);
  }, [fetchData]);

  useEffect(() => {
    if (!isDefaultView || query) {
      fetchData(query, currentPage);
    }
  }, [query, currentPage, fetchData, isDefaultView]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCurrentPage(1);
      setIsDefaultView(!val.trim());
      setQuery(val.trim());
    }, 500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    setCurrentPage(1);
    setIsDefaultView(!inputValue.trim());
    setQuery(inputValue.trim());
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = pagination?.last_visible_page ?? 1;
  const hasNextPage = pagination?.has_next_page ?? false;

  return (
    <main
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
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌸</span>
            <span
              className="text-2xl font-bold tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--text-primary)" }}
            >
              MangaNest
            </span>
          </div>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg">
            <div className="relative">
              <input
                id="manga-search"
                name="manga-search"
                type="search"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search manga titles..."
                className="w-full rounded-full px-5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-1"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  "--tw-ring-color": "var(--accent)",
                }}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
                style={{ background: "var(--accent)" }}
                onMouseEnter={(e) => (e.target.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.target.style.background = "var(--accent)")}
              >
                Search
              </button>
            </div>
          </form>

          {/* Nav */}
          <nav className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            <Link
              href="/manganest/library"
              className="text-sm transition-colors px-3 py-1.5 rounded-full border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border-subtle)",
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
                  className="text-sm transition-colors px-3 py-1.5 rounded-full border"
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1
            className="text-3xl font-bold tracking-wider"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--text-primary)" }}
          >
            {query ? `Results for "${query}"` : "Popular Manga"}
          </h1>
          {pagination && !loading && (
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {query
                ? `Page ${currentPage} of ${totalPages}`
                : `Page ${currentPage} • Popular picks from MyAnimeList`}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            className="rounded-xl px-5 py-4 text-sm mb-6 border"
            style={{
              background: "var(--error-bg)",
              borderColor: "var(--error-border)",
              color: "var(--error-text)",
            }}
          >
            ⚠️ {error}
            <button
              onClick={() => fetchData(query, currentPage)}
              className="ml-3 underline transition-colors"
              style={{ color: "var(--error-text)" }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: RESULTS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden animate-pulse border"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="h-56" style={{ background: "var(--skeleton)" }} />
                <div className="p-4 space-y-2">
                  <div className="h-4 rounded w-3/4" style={{ background: "var(--skeleton)" }} />
                  <div className="h-3 rounded w-1/2" style={{ background: "var(--skeleton)" }} />
                  <div className="h-3 rounded w-full" style={{ background: "var(--skeleton)" }} />
                  <div className="h-3 rounded w-5/6" style={{ background: "var(--skeleton)" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((manga) => (
              <MangaCard key={manga.mal_id} manga={manga} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && results.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-3"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="text-5xl">📚</span>
            <p className="text-sm">No manga found for that search.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && results.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full text-sm border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              ← Prev
            </button>

            {getPageRange(currentPage, totalPages).map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} style={{ color: "var(--text-muted)" }} className="px-1">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className="w-9 h-9 rounded-full text-sm font-semibold transition-all border"
                  style={
                    p === currentPage
                      ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
                      : { background: "var(--bg-secondary)", borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }
                  }
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className="px-4 py-2 rounded-full text-sm border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function getPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, 2, current - 1, current, current + 1, total - 1, total]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }
  return result;
}