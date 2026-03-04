export default function GroceryItem({ name, quantity, category }) {
  return (
    <li className="p-4 bg-white border border-gray-900 rounded-sm shadow-sm transition-transform hover:scale-[1.01]">
      <h3 className="text-lg font-bold lowercase">{name}</h3>
      <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
      <p className="text-gray-600 text-sm capitalize">Category: {category}</p>
    </li>
  );
}