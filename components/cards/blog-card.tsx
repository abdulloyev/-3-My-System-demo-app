import { cn } from "@/lib/utils";
import { IBlog } from "@/types";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props extends IBlog {
  isVertical?: boolean;
}

const BlogCard = (lesson: Props) => {
  return (
    <div
      className={cn(
        "grid gap-4 group",
        lesson.isVertical ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      )}
    >
      <Link href={`/home/topics/${lesson.slug}`}>
        <div className="relative rounded-md bg-secondary">
          {lesson.image?.url && (
            <Image
              src={lesson.image.url}
              alt={lesson.description && lesson.title}
              width={650}
              height={335}
              className=" -translate-y-6 rounded-md object-cover px-2 grayscale transition-all group-hover:-translate-y-7 group-hover:grayscale-0 max-md:translate-y-2 md:px-7"
              priority={true}
            />
          )}
        </div>
      </Link>

      <div className="flex flex-col space-y-4">
        <Link
          href={`/home/topics/${lesson.slug}`}
          className="flex flex-col space-y-4"
        >
          {/* Title */}
          <h2 className="flex justify-between mt-3 font-roboto text-3xl transition-colors group-hover:text-primary max-md:text-2xl">
            {lesson.title} <LockIcon size={"20px"} />
          </h2>
          <p className="line-clamp-3 text-muted-foreground">
            {lesson.description}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
