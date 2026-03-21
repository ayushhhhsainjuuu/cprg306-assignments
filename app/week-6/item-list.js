"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="sortBy" className="mr-2 font-medium">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
      </div>

      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}