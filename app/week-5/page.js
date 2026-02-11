import NewItem from "./NewItem";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-zinc-100 mb-4">
          Week 5 - New Item
        </h1>
        <NewItem />
      </div>
    </main>
  );
}