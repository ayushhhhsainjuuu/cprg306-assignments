"use client";

import { useState } from "react";
import NewGroceryItem from "./NewGroceryItem";
import GroceryItemList from "./GroceryItemList";
import itemsData from "./grocery-items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-left">Week 7 — Shopping List</h1>
        {/* State Lifting: Passing handler and items as props */}
        <NewGroceryItem onAddItem={handleAddItem} />
        <GroceryItemList items={items} />
      </div>
    </main>
  );
}