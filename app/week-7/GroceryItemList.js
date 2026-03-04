"use client";

import { useState } from "react";
import GroceryItem from "./GroceryItem";

export default function GroceryItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  // Create a sorted copy of the items prop (Immutability)
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-semibold">Sort by:</span>
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded ${
            sortBy === "name" ? "bg-orange-500 text-white" : "bg-orange-200"
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded ${
            sortBy === "category" ? "bg-orange-500 text-white" : "bg-orange-200"
          }`}
        >
          Category
        </button>
      </div>

      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <GroceryItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}