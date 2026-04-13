"use client";

import { useEffect, useState } from "react";
import { getManga } from "@/app/utils/jikan";
import Link from "next/link";

export default function HomePage() {
  const [manga, setManga] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadManga = async () => {
      try {
        const data = await getManga(page);
        setManga(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadManga();
  }, [page]);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Trending Manga
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {manga.map((m) => (
          <Link key={m.mal_id} href={`/manganest/manga/${m.mal_id}`}>
            <div className="bg-white dark:bg-[#151124] rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer">
              
              <img
                src={m.images.jpg.image_url}
                alt={m.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-3">
                <p className="text-sm font-semibold line-clamp-2">
                  {m.title}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-lg font-medium">
          Page {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Next
        </button>

      </div>
    </div>
  );
}