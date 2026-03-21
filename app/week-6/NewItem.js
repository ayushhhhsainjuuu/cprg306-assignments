"use client";

import { useState } from "react";

const CATEGORY_OPTIONS = [
  { value: "produce", label: "Produce" },
  { value: "dairy", label: "Dairy" },
  { value: "bakery", label: "Bakery" },
  { value: "meat", label: "Meat" },
  { value: "frozen", label: "Frozen Foods" },
  { value: "canned", label: "Canned Goods" },
  { value: "dry", label: "Dry Goods" },
  { value: "beverages", label: "Beverages" },
  { value: "snacks", label: "Snacks" },
  { value: "household", label: "Household" },
  { value: "other", label: "Other" },
];

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newItem = {
      id: crypto.randomUUID(),
      name: trimmedName,
      quantity,
      category,
    };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Item Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter item name"
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block font-medium mb-1">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          max="20"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="category" className="block font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 w-full"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        aria-label="Add item"
        title="Add item"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </form>
  );
}