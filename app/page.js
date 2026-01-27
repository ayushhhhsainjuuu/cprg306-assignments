import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        CPRG 306: Web Development 2 - Assignments
      </h1>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link className="text-blue-600 hover:underline" href="/week-2">
            Week 2 - Shopping List
          </Link>
        </li>

        <li>
          <Link className="text-blue-600 hover:underline" href="/week-3">
            Week 3 - Shopping List
          </Link>
        </li>
      </ul>

      <p className="mt-6 text-gray-600">By Ayush Sainju</p>
    </main>
  );
}
