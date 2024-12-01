"use client";

import { Separator } from "@/components/ui/separator";
import { lessons } from "@/constants";
import parse from "html-react-parser";
import { BookOpenCheck, BookOpenText, TextSelection } from "lucide-react";
import Image from "next/image";
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

            <div className="grid grid-cols-2 gap-5">
              <Button
                className="my-2"
                onClick={() => router.push(`${blog.slug}/${blog.id}`)}
              >
                <BookOpenCheck className="mr-2 h-4 w-4" /> Test
              </Button>

              <Button
                className="my-2"
                onClick={() => router.push(`${blog.slug}/algo/${blog.id}`)}
                variant={"secondary"}
              >
                <TextSelection className="mr-2 h-4 w-4" /> Algoritm
              </Button>
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator className="mt-3" />
    </div>
  );
}

export default SlugPage;
