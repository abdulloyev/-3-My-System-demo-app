// Savollar turini aniqlash
export interface Answer {
  id: string;
  answer: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  answer: Answer[];
}

// Savollar ma'lumotlari
export const questions: Question[] = [];
