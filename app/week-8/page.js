"use client";
import { useState } from "react";
import NewGroceryItem from "./NewGroceryItem";
import GroceryItemList from "./GroceryItemList";
import MealIdeas from "./MealIdeas";
import groceryItems from "./grocery-items.json";

export default function Page() {
  const [items, setItems] = useState(groceryItems);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  function handleItemSelect(item) {
    // Clean name: remove comma/quantity suffix and emoji characters
    const cleaned = item.name
      .split(",")[0]
      .replace(/[\u{1F300}-\u{1FFFF}]/gu, "")
      .replace(/[\u2600-\u27FF]/g, "")
      .trim();
    setSelectedItemName(cleaned);
  }

  return (
    <main>
      <h1>Shopping List + Meal Ideas</h1>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <NewGroceryItem onAddItem={handleAddItem} />
          <GroceryItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
