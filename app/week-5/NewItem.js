"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(event) {
    event.preventDefault();

    const item = {
      name,
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
      className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring"
          placeholder="e.g., Bread"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-200 mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-200 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen foods">Frozen Foods</option>
            <option value="canned goods">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="self-end px-4 py-2 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-500 active:bg-blue-700"
          aria-label="Add item"
          title="Add item"
        >
          +
        </button>
      </div>
    </form>
  );
}