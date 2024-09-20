"use client";

import { useState } from "react";
import { topics } from "@/constants";
import { LockKeyhole, UnlockKeyhole } from "lucide-react"; // `UnlockKeyhole` ham qo'shamiz
import Link from "next/link";

export default function HomePage() {
  // Har bir mavzuning qulfini boshqarish uchun holat
  const [unlockedTopics, setUnlockedTopics] = useState<number[]>([1]); // Faqat 1-mavzu ochiq

  const unlockNextTopic = (id: number) => {
    // Keyingi mavzuni ochish
    if (!unlockedTopics.includes(id)) {
      setUnlockedTopics([...unlockedTopics, id]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-muted p-3">
      <h1 className="mt-14 text-2xl font-semibold mb-3 text-secondary-foreground">
        Mavzular ro`yxati
      </h1>
      <div className="w-full flex flex-col max-w-md space-y-6">
        {topics.map(topic => (
          <div key={topic.id} className="relative">
            {/* Har bir mavzu uchun shartli ravishda qulf/ochiqlikni ko'rsatish */}
            <div
              className={`${
                unlockedTopics.includes(topic.id)
                  ? "cursor-pointer dark:bg-muted-foreground border rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-200"
                  : "cursor-not-allowed bg-gray-300 border rounded-lg shadow-md p-3"
              }`}
              onClick={() =>
                unlockedTopics.includes(topic.id)
                  ? unlockNextTopic(topic.id + 1)
                  : null
              }
            >
              <div className="text-xl flex justify-between">
                <p className="font-sans">{topic.title}</p>
                {unlockedTopics.includes(topic.id) ? (
                  <UnlockKeyhole /> // Ochiq bo'lsa ochiq qulfi ko'rsatiladi
                ) : (
                  <LockKeyhole /> // Yopiq bo'lsa qulf belgisi
                )}
              </div>
            </div>

            {/* Ochiq mavzular uchun Link qo'shamiz */}
            {unlockedTopics.includes(topic.id) && (
              <Link
                href={`/home/topics/${topic.id}`}
                className="absolute inset-0"
              >
                {/* Mavzuga yo'naltiruvchi havola */}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
