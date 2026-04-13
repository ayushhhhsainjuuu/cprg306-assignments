"use client";

import { useEffect, useState } from "react";
import { getMangaById } from "@/app/utils/jikan";

export default function MangaDetail({ params }) {
  const { id } = params;

  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const data = await getMangaById(id);
        setManga(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchManga();
  }, [id]);

  if (!manga) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        {manga.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Image */}
        <img
          src={manga.images.jpg.image_url}
          alt={manga.title}
          className="rounded-xl w-full"
        />

        {/* Info */}
        <div>
          <p className="mb-4 text-gray-400">
            {manga.synopsis}
          </p>

          <p><strong>Score:</strong> {manga.score}</p>
          <p><strong>Status:</strong> {manga.status}</p>
          <p><strong>Chapters:</strong> {manga.chapters}</p>

        </div>
      </div>

    </div>
  );
}