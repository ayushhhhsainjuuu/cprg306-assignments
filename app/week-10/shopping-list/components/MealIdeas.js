"use client";

import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
  );
  const data = await res.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  async function loadMealIdeas() {
    const result = await fetchMealIdeas(ingredient);
    setMeals(result);
  }

  useEffect(() => {
    if (ingredient) loadMealIdeas();
    else setMeals([]);
  }, [ingredient]);

  if (!ingredient) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Meal ideas for &ldquo;{ingredient}&rdquo;</h2>
      <div className="grid grid-cols-2 gap-3">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-800"
          >
            {meal.strMeal}
          </div>
        ))}
      </div>
    </div>
  );
}