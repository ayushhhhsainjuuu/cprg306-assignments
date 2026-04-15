"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../../contexts/AuthContext";

import itemsData from "./grocery-items.json";
import GroceryItemList from "./components/GroceryItemList";
import MealIdeas from "./components/MealIdeas";
import NewGroceryItem from "./components/NewGroceryItem";

export default function ShoppingListPage() {
  const authContext = useUserAuth();
  const user = authContext?.user;
  const firebaseSignOut = authContext?.firebaseSignOut;
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(",")[0]
      .replaceAll("🥛", "")
      .replaceAll("🍞", "")
      .replaceAll("🧀", "")
      .replaceAll("🍗", "")
      .replaceAll("🍌", "")
      .replaceAll("🥬", "")
      .replaceAll("🥦", "")
      .replaceAll("🍓", "")
      .replaceAll("🥚", "")
      .replaceAll("🧈", "")
      .replaceAll("🍽️", "")
      .trim()
      .toLowerCase();
    setSelectedItemName(cleanedName);
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut?.();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <main className="p-6">
        <h1 className="mb-4 text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="mb-4">You must be logged in to view the shopping list.</p>
        <Link href="/week-9" className="text-blue-600 hover:underline">
          Go back to login
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shopping List</h1>
          <p className="text-sm text-gray-600">
            Welcome, {user.displayName || user.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/week-9"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Back
          </Link>
          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <NewGroceryItem onAddItem={handleAddItem} />

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <GroceryItemList items={items} onItemSelect={handleItemSelect} />
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}