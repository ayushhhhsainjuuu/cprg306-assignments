"use client";
import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
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

  return (
    <div>
      {ingredient && <h2>Meal ideas for "{ingredient}"</h2>}
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
}
