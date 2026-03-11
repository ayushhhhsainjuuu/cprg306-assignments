export default function GroceryItem({ item, onSelect }) {
  return (
    <li onClick={() => onSelect(item)} style={{ cursor: "pointer" }}>
      {item.name} {/* emoji */}
      <br />
      Quantity: {item.quantity}
      <br />
      Category: {item.category}
    </li>
  );
}
