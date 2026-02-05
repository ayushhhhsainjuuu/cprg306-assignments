export default function Item({ name, quantity, category }) {
  return (
    <li className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="font-semibold text-lg">{name}</div>

      <div className="text-sm text-gray-600 mt-1">
        Buy: <span className="font-medium">{quantity}</span>
      </div>

      <div className="text-sm text-gray-600">
        Category: <span className="capitalize font-medium">{category}</span>
      </div>
    </li>
  );
}