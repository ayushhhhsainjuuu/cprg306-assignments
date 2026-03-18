export default function GroceryItem({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={onSelect}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:shadow-sm transition"
    >
      <p className="font-semibold text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      <p className="text-sm text-gray-500">Category: {category}</p>
    </li>
  );
}