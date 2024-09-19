import { topics } from "@/constants";
import Link from "next/link";

export default function TopicPage({ params }: { params: { id: string } }) {
  // Mavzuni topish
  const topic = topics.find(t => t.id === Number(params.id));

  if (!topic) {
    return <p>Mavzu topilmadi</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{topic.title}</h1>
        <p className="text-lg text-gray-700">{topic.description}</p>
        <Link href={"/home"} className="mt-4 text-blue-600 hover:underline">
          Orqaga qaytish
        </Link>
      </div>
    </div>
  );
}
