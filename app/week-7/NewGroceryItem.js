"use client";
import { useState } from "react";

export default function NewGroceryItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const increment = () => setQuantity((q) => (q < 20 ? q + 1 : q));
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddItem({
      id: Math.random().toString(36).substring(2, 9),
      name,
      quantity,
      category,
    });

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input 
            type="text" 
            placeholder="e.g., milk, 4 L 🥛"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">Quantity (1–20)</label>
          <div className="flex flex-col gap-2">
            <span>Current: <span className="font-bold">{quantity}</span></span>
            <div className="flex gap-2">
              <button type="button" onClick={decrement} className="w-10 h-10 bg-gray-100 rounded-md text-xl">-</button>
              <button type="button" onClick={increment} className="w-10 h-10 bg-blue-500 text-white rounded-md text-xl">+</button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md bg-white outline-none capitalize"
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

        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
          Add Item
        </button>
      </form>
    </div>
  );
}