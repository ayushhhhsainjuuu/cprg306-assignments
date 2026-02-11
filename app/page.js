import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        CPRG 306: Web Development 2 - Assignments
      </h1>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link href="/week-2" className="text-blue-600 hover:underline">
            Week 2 - Shopping List
          </Link>
        </li>

        <li>
          <Link href="/week-3" className="text-blue-600 hover:underline">
            Week 3 - Shopping List
          </Link>
        </li>

        <li>
          <Link href="/week-4" className="text-blue-600 hover:underline">
            Week 4 - Shopping List
          </Link>
        </li>

        {/* ✅ Added Week 5 */}
        <li>
          <Link href="/week-5" className="text-blue-600 hover:underline">
            Week 5 - New Item Form
          </Link>
        </li>
      </ul>

      <p className="mt-6">By Ayush Sainju</p>
    </main>
  );
}