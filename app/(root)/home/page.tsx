import Link from "next/link";
import React from "react";

// Mavzular ro'yxati
const topics = [
  {
    id: 1,
    title: "1-mavzu",
    description: "Bu mavzuda React haqida asosiy tushunchalar o'rganiladi.",
  },
  {
    id: 2,
    title: "2-mavzu",
    description:
      "Bu mavzuda React komponentlari va props haqida ma'lumot beriladi.",
  },
  {
    id: 3,
    title: "3-mavzu",
    description:
      "Bu mavzuda React holat va state hook'lari haqida o'rganiladi.",
  },
];

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
              <span className="text-2xl font-semibold text-blue-600 cursor-pointer">
                {topic.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
