"use client";

import { useState } from "react";

export default function NewGroceryItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      quantity,
      category,
    };

    onAddItem(item);
    
    // Reset form
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const increment = () => setQuantity((prev) => (prev < 20 ? prev + 1 : prev));
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            placeholder="e.g., milk, 4 L 🥛"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Quantity (1–20)</label>
          <div className="flex flex-col gap-2">
            <span className="text-lg">Current: <span className="font-bold">{quantity}</span></span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={decrement}
                disabled={quantity === 1}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md disabled:opacity-50 text-xl"
              >
                -
              </button>
              <button
                type="button"
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md text-xl"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen">Frozen Foods</option>
            <option value="canned">Canned Goods</option>
            <option value="dry">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-32 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}