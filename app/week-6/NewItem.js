"use client";

import { useId, useState } from "react";

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

export default function NewItem() {
  const baseId = useId();

  const nameId = `${baseId}-name`;
  const quantityId = `${baseId}-quantity`;
  const categoryId = `${baseId}-category`;

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(event) {
    event.preventDefault();

    const item = {
      name: name.trim(),
      quantity,
      category,
    };

    console.log(item);
    alert(`Added: ${item.name}, quantity: ${item.quantity}, category: ${item.category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg bg-white p-6 shadow-md space-y-4 text-gray-900"
    >
      {/* Name */}
      <div>
        <label htmlFor={nameId} className="block text-sm font-medium mb-1">
          Item Name
        </label>
        <input
          id={nameId}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          placeholder="e.g., Bread"
        />
      </div>

      {/* Quantity + Category + Submit (aligned) */}
      <div className="flex gap-3 items-end">
        {/* Quantity */}
        <div className="w-28">
          <label htmlFor={quantityId} className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            id={quantityId}
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>

        {/* Category */}
        <div className="flex-1">
          <label htmlFor={categoryId} className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id={categoryId}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            {CATEGORY_OPTIONS.map((item) => (
              <option key={item.value} {...item}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="h-[42px] w-12 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700 active:bg-blue-800 transition"
          aria-label="Add item"
          title="Add item"
        >
          +
        </button>
      </div>
    </form>
  );
}