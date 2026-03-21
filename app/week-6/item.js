export default function Item({ item }) {
  return (
    <li className="border rounded p-3">
      <p className="font-semibold">{item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Category: {item.category}</p>
    </li>
  );
}