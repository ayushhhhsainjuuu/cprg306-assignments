"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MangaCard({ manga }) {
  const [imgError, setImgError] = useState(false);

  const {
    mal_id,
    title,
    title_english,
    images,
    score,
    synopsis,
    genres = [],
    status,
  } = manga;

  const displayTitle = title_english || title;
  const coverUrl = images?.jpg?.large_image_url || images?.jpg?.image_url;

  const scoreColor =
    score >= 8
      ? "var(--score-high)"
      : score >= 6
      ? "var(--score-mid)"
      : "var(--score-low)";

  return (
    <article
      className="group relative rounded-xl overflow-hidden transition-all duration-300 border"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-subtle)",
      }}
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
      <Link href={`/manganest/manga/${mal_id}`} className="block relative h-56 overflow-hidden">
        <Image
          src={imgError ? "/placeholder-manga.png" : coverUrl || "/placeholder-manga.png"}
          alt={`Cover of ${displayTitle}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--bg-card) 0%, transparent 50%)",
          }}
        />

        {score && (
          <span
            className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm"
            style={{
              background: "rgba(0,0,0,0.65)",
              color: scoreColor,
            }}
          >
            ★ {score.toFixed(1)}
          </span>
        )}

        {status && (
          <span
            className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider"
            style={{
              background: "rgba(0,0,0,0.65)",
              color: "var(--accent)",
            }}
          >
            {status}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 space-y-2">
        <h2
          className="text-sm font-semibold leading-tight line-clamp-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "15px",
            letterSpacing: "0.05em",
            color: "var(--text-primary)",
          }}
        >
          {displayTitle}
        </h2>

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 3).map((g) => (
              <span
                key={g.mal_id}
                className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                {g.name}
              </span>
            ))}
          </div>
        )}

        {synopsis && (
          <p
            className="text-xs leading-relaxed line-clamp-3"
            style={{ color: "var(--text-muted)" }}
          >
            {synopsis}
          </p>
        )}
      </div>
    </article>
  );
}