import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface LngParams {
  params: { lng: string };
}

export interface ICourse {
  title: string;
  previewImage: string;
  level: string;
  author: {
    image: string;
    name: string;
  };
  oldPrice: number;
  currentPrice: number;
}

export interface ICategory {
  label: string;
  icon: string;
}

export interface IInstructor {
  name: string;
  image: string;
  job: string;
}

export interface IBlogContent {
  html: string;
}

export interface IBlogAuthor {
  id: string;
  name: string;
  image: { url: string };
  bio?: string;
}

export interface IBlogCategory {
  name: string;
  slug: string;
}

export interface IBlogTag {
  name: string;
  slug: string;
}

export interface IBlog {
  id: string;
  title: string;
  description: string;
  author: IBlogAuthor;
  image: { url: string };
  content: IBlogContent;
  slug: string;
  category: IBlogCategory;
  tag: IBlogTag;
  createdAt: string;
  video: string;
}
