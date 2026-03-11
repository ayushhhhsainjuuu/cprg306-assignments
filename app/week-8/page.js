"use client";

import { useState } from "react";
import NewGroceryItem from "./NewGroceryItem";
import GroceryItemList from "./GroceryItemList";
import MealIdeas from "./MealIdeas";
import itemsData from "./grocery-items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  function handleItemSelect(item) {
    const cleaned = item.name
      .split(",")[0]
      .replace(/[\u{1F300}-\u{1FFFF}]/gu, "")
      .replace(/[\u2600-\u27FF]/g, "")
      .trim();
    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping List + Meal Ideas</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full max-w-xl">
          <NewGroceryItem onAddItem={handleAddItem} />
          <GroceryItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}