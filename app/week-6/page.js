    
import NewItem from "./NewItem";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          New Shopping Item
        </h1>
        <NewItem />
      </div>
    </main>
  );
}