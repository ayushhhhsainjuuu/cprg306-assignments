import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        CPRG 306: Web Development 2 - Assignments
      </h1>

      <ul className="list-disc space-y-2 pl-6">
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

        <li>
          <Link href="/week-5" className="text-blue-600 hover:underline">
            Week 5 - New Item Form
          </Link>
        </li>

        <li>
          <Link href="/week-6" className="text-blue-600 hover:underline">
            Week 6 - New Item Form with Validation
          </Link>
        </li>

        <li>
          <Link href="/week-7" className="text-blue-600 hover:underline">
            Week 7 - Shopping List (Refactor)
          </Link>
        </li>

        <li>
          <Link href="/week-8" className="text-blue-600 hover:underline">
            Week 8 - Shopping List with meal ideas
          </Link>
        </li>

        <li>
          <Link href="/week-9" className="text-blue-600 hover:underline">
            Week 9 - Firebase Auth Shopping List
          </Link>
        </li>
        <li>
          <Link href="/week-10" className="text-blue-600 hover:underline">
            Week 10 - Firebase Auth Shopping List
          </Link>
        </li>
        <li>
          <Link href="/manganest">
            <div className="mt-6 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer">
              MangaNest Project
            </div>
          </Link>
        </li> 
      </ul>

      <p className="mt-6">By Ayush Sainju</p>
    </main>
  );
}