import { CalendarDays, Clock, Minus } from "lucide-react";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import { getReadingTime } from "@/lib/utils";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { LngParams } from "@/types";
import { lessons } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = lessons;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      image: blog.image.url,
    },
    slug: blog.slug,
    date: blog.createdAt,
    authors: blog.author.name,
    keywords: blog.content.html,
  };
}

async function SlugPage({
  params,
}: {
  params: { slug: string; lng: LngParams };
}) {
  const blog = await getDetailedBlog(params.slug);
  const { t } = await translation(params.lng as unknown as string);

  return (
    <div className="mx-auto mt-[12vh] max-w-5xl px-6">
      <div className="mb-6">
        <TopBar label="navLink3" extra={blog.title} />
      </div>

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
          <p>
            {getReadingTime(blog.content.html)} {t("timeRead")}
          </p>
        </div>
        <Minus />
        <div className="flex items-center gap-2">
          <CalendarDays className="size-5" />
          <p>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</p>
        </div>
      </div>

      {/* {blog.video && (
        <div className="my-5 w-full  overflow-hidden rounded-md object-cover">
          <iframe
            className="w-full rounded-md max-md:h-[350px] md:h-[600px]"
            src={blog.video}
            title={blog.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )} */}

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
        <div className="prose max-w-none flex-1 dark:prose-invert">
          {parse(blog.content.html)}
        </div>
      </div>

      <Separator className="mt-3" />

      <div className="mt-6 flex items-center gap-6 max-md:flex-col">
        <Image
          src={blog.author.image.url}
          alt={blog.author.name}
          width={155}
          height={155}
          className="size-[155px] rounded-md object-cover max-md:self-start"
          priority={true}
        />

        <div className="flex flex-1 flex-col space-y-4">
          <h2 className="font-roboto text-3xl">{blog.author.name}</h2>
          <p className="line-clamp-2 text-muted-foreground">
            {blog.author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SlugPage;
