"use client";

import { useState } from "react";
import GroceryItem from "./GroceryItem";

export default function GroceryItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  // IMMUTABILITY CHECK: Creating a copy of the prop before sorting
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
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
          // WARNING FIX: Using unique item.id as the key
          <GroceryItem key={item.id} {...item} />
        ))}
      </ul>

      {/* WIREFRAME REQUIREMENT: Visualizing the structure */}
      <hr className="my-12 border-gray-300" />
      <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-400">
        <h2 className="text-xl font-bold mb-4 text-gray-500">Project Wireframe</h2>
        <div className="space-y-2 opacity-60">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"> [ Header: Week 7 ] </div>
          <div className="h-32 bg-gray-300 rounded"> [ Form: Name | Quantity Stepper | Category ] </div>
          <div className="h-8 bg-gray-300 rounded w-1/4"> [ Sort Controls ] </div>
          <div className="h-16 bg-gray-300 rounded"> [ List Item 1 ] </div>
          <div className="h-16 bg-gray-300 rounded"> [ List Item 2 ] </div>
        </div>
      </div>
    </section>
  );
}