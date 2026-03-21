"use client";

import { useState } from "react";
import NewItem from "./NewItem";
import ItemList from "./item-list";
import itemsData from "./grocery-items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}