import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface LngParams {
  params: { lng: string };
}

export interface IQuestionsSnswer {
  id: string;
  answer: string;
  isCorrect: boolean;
}

export interface IQuestions {
  id: string;
  question: string;
  answer: IQuestionsSnswer[];
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
  questions: IQuestions[];
  author: IBlogAuthor;
  image: { url: string };
  content: IBlogContent;
  slug: string;
  category: IBlogCategory;
  tag: IBlogTag;
  createdAt: string;
  video: string;
}
