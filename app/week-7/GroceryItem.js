export default function GroceryItem({ name, quantity, category }) {
  return (
    <li className="p-4 border border-gray-800 rounded-md bg-white mb-2 max-w-lg">
      <h3 className="text-lg font-medium lowercase">{name}</h3>
      <p className="text-gray-700">Quantity: {quantity}</p>
      <p className="text-gray-700 capitalize">Category: {category}</p>
    </li>
  );
}