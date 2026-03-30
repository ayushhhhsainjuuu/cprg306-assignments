"use client";

import { useState } from "react";
import GroceryItem from "./GroceryItem";

export default function GroceryItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <section className="mt-8">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-700 font-medium">Sort by:</span>
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-md transition ${
            sortBy === "name" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-md transition ${
            sortBy === "category" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Category
        </button>
      </div>

      <ul className="space-y-4">
        {sortedItems.map((item) => (
          <GroceryItem key={item.id} {...item} onSelect={() => onItemSelect(item)} />
        ))}
      </ul>
    </section>
  );
}