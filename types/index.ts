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

export interface IBlog {
  id: string;
  title: string;
  description: string;
  questions: IQuestions[];
  quizImg: string[];
  image: { url: string };
  content: IBlogContent;
  slug: string;
  video: string;
}
