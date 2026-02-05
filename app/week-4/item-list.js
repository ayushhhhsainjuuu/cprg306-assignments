import Item from "./item";
import items from "./items.json";

const toTitleCase = (str) =>
  str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function ItemList() {
  const groupedItems = items.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  const categories = Object.keys(groupedItems).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const sortedCategoryItems = [...groupedItems[category]].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        return (
          <section key={category}>
            <h2 className="text-lg font-semibold tracking-wide uppercase text-gray-700 border-b pb-1 mb-4">
              {toTitleCase(category)}
            </h2>

            <ul className="space-y-3">
              {sortedCategoryItems.map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}