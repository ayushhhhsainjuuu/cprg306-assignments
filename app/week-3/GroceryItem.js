export default function Item({ name, quantity, category }) {
  return (
    <li className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-600">
          Buy {quantity} in {category}
        </p>
      </div>

      <span className="text-xs uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
        {category}
      </span>
    </li>
  );
}
