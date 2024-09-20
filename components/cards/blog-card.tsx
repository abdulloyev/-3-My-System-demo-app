import { cn, getReadingTime } from "@/lib/utils";
import { IBlog } from "@/types";
import { format } from "date-fns";
import { CalendarDays, Clock1, ListIcon, LockIcon, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

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
      <Link href={`/home/topics/1`}>
        <div className="relative rounded-md bg-secondary">
          <Image
            src={lesson.image.url}
            alt={lesson.description && lesson.title}
            width={650}
            height={335}
            className=" -translate-y-6 rounded-md object-cover px-2 grayscale transition-all group-hover:-translate-y-7 group-hover:grayscale-0 max-md:translate-y-2 md:px-7"
            priority={true}
          />
        </div>
      </Link>

      <div className="flex flex-col space-y-4">
        <Link href={`/home/topics/1`} className="flex flex-col space-y-4">
          {/* Time info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-5" />
              <p>{format(new Date(lesson.createdAt), "MMM dd, yyyy")}</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Clock1 className="size-5" />
                <p>{getReadingTime(lesson.content.html)} daqiqa o`qish</p>
              </div>
            </div>
          </div>
          {/* Title */}
          <h2 className="flex justify-between font-roboto text-3xl transition-colors group-hover:text-primary max-md:text-2xl">
            {lesson.title} <LockIcon size={"20px"} />
          </h2>
          <p className="line-clamp-3 text-muted-foreground">
            {lesson.description}
          </p>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="cursor-pointer">
              <Badge variant={"secondary"}>
                <Tags className="me-2 size-3" />
                <span className="line-clamp-1">{lesson.tag.name}</span>
              </Badge>
            </div>

            <div className="cursor-pointer">
              <Badge variant={"outline"}>
                <ListIcon className="me-2 size-3" />
                <span className="line-clamp-1">{lesson.category.name}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
