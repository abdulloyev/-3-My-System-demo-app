"use client";

import BlogCard from "@/components/cards/blog-card";
import { lessons } from "@/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-popover p-3 bg-gradient-to-t from-blue-300 via-pink-200 to-yellow-200">
      <h1 className="mt-14 text-2xl font-semibold mb-3 text-secondary-foreground text-blue-500">
        Mavzular ro`yxati
      </h1>
      <div className="container mx-auto max-w-6xl px-2 py-10">
        <div className="container mx-auto max-w-6xl max-sm:p-0">
          {lessons.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-24  max-md:grid-cols-1 xl:grid-cols-3">
              {lessons.map(lesson => (
                <BlogCard key={lesson.title} {...lesson} isVertical={true} />
              ))}
            </div>
          ) : (
            <h3 className="mt-20 text-center text-xl text-muted-foreground">
              {"Kurslar topilmadi"}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
