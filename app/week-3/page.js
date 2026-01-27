import GroceryItemList from "./GroceryItemList";

export default function Page() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      <GroceryItemList />
    </main>
  );
}
