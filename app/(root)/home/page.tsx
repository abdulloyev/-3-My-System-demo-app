import { topics } from "@/constants";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Mavzular ro`yxati
      </h1>
      <ul className="w-full max-w-md space-y-6">
        {topics.map(topic => (
          <li
            key={topic.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Next.js Link component */}
            <Link href={`/topics/${topic.id}`}>
              <span className="text-xl font-semibold text-blue-600 cursor-pointer">
                {topic.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
