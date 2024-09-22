"use client";

import { Separator } from "@/components/ui/separator";
import { lessons } from "@/constants";
import { getReadingTime } from "@/lib/utils";
import { format } from "date-fns";
import parse from "html-react-parser";
import {
  BookOpenCheck,
  BookOpenText,
  CalendarDays,
  Clock,
  Minus,
} from "lucide-react";
import Image from "next/image";
import ShareBtns from "../_components/share-btns";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

function SlugPage({ params }: { params: { id: string } }) {
  const blog = lessons.filter(i => i.slug === params.id)[0];
  const router = useRouter();

  return (
    <div className="mx-auto px-3 pt-16 max-w-5xl bg-popover">
      <h1 className="font-roboto text-4xl md:text-5xl lg:text-6xl">
        {blog.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 max-md:justify-center">
        <div className="flex items-center gap-2">
          <Image
            src={blog.author.image.url}
            alt={blog.author.name}
            width={30}
            height={30}
            className="size-[30px] rounded-sm object-cover"
            priority={true}
          />
          <p>{blog.author.name}</p>
        </div>
        <Minus />
        <div className="flex items-center gap-2">
          <Clock className="size-5" />
          <p>{getReadingTime(blog.content.html)} daqiqa o`qish</p>
        </div>
        <Minus />
        <div className="flex items-center gap-2">
          <CalendarDays className="size-5" />
          <p>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</p>
        </div>
      </div>

      {blog.video && (
        <div className="my-5 w-full overflow-hidden rounded-md object-cover">
          <iframe
            className="w-full rounded-md max-md:h-[350px] md:h-[600px]"
            src={`${blog.video}?modestbranding=1&rel=0`}
            title={blog.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <Image
        src={blog.image.url}
        alt={blog.title}
        priority={true}
        width={1120}
        height={595}
        className="mt-4 rounded-md"
      />

      <div className="relative mt-12 flex max-md:flex-col-reverse md:gap-12">
        <div className="flex flex-col space-y-3">
          <div className="sticky top-36">
            {/* <p className="text-lg uppercase text-muted-foreground">Share</p> */}
            <ShareBtns />
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="flex">
                <BookOpenText className="mr-2 h-5 w-5" /> Mavzuga oid qo`llanma
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose dark:prose-invert max-w-none flex-1">
                {parse(blog.content.html)}
              </div>
            </AccordionContent>

            <Button
              className="my-2"
              onClick={() => router.push(`${blog.slug}/demo`)}
            >
              <BookOpenCheck className="mr-2 h-4 w-4" /> Test
            </Button>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator className="mt-3" />
    </div>
  );
}

export default SlugPage;
