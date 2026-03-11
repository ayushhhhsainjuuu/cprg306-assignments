"use client";
import { useState } from "react";
import GroceryItem from "./GroceryItem";

export default function GroceryItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const sorted = [...items].sort((a, b) =>
    sortBy === "name"
      ? a.name.localeCompare(b.name)
      : a.category.localeCompare(b.category)
  );

  return (
    <div>
      <div>
        Sort by:
        <button onClick={() => setSortBy("name")}>Name</button>
        <button onClick={() => setSortBy("category")}>Category</button>
      </div>
      <ul>
        {sorted.map((item) => (
          <GroceryItem
            key={item.id}
            item={item}
            onSelect={onItemSelect}
          />
        ))}
      </ul>
    </div>
  );
}
