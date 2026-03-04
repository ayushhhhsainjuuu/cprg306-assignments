"use client";
import { useState } from "react";
import GroceryItem from "./GroceryItem";

export default function GroceryItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-600">Sort by:</span>
        <button 
          onClick={() => setSortBy("name")}
          className={`px-4 py-1 rounded-md ${sortBy === "name" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Name
        </button>
        <button 
          onClick={() => setSortBy("category")}
          className={`px-4 py-1 rounded-md ${sortBy === "category" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Category
        </button>
      </div>

      <ul className="space-y-3">
        {sortedItems.map((item) => (
          <GroceryItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}