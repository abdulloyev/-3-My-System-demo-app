"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// Savollar turini aniqlash
interface Answer {
  id: string;
  answer: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  answer: Answer[];
}

// Savollar ma'lumotlari
const questions: Question[] = [
  {
    id: "qwe12a",
    question: "Next.js nima?",
    answer: [
      {
        id: "qwe12a1",
        answer:
          "Serverda render qilingan ilovalarni yaratish uchun JavaScript freymorki",
        isCorrect: true,
      },
      {
        id: "qwe12a2",
        answer: "Statik veb-saytlar yaratish uchun freymork",
        isCorrect: false,
      },
      {
        id: "qwe12a3",
        answer: "Mobil ilovalar yaratish uchun freymork",
        isCorrect: false,
      },
      {
        id: "qwe12a4",
        answer: "Veb-ilovalar yaratish uchun freymork",
        isCorrect: false,
      },
    ],
  },
  {
    id: "oiq11203",
    question: "React nima?",
    answer: [
      {
        id: "oiq112031",
        answer:
          "Foydalanuvchi interfeyslarini yaratish uchun JavaScript kutubxonasi",
        isCorrect: true,
      },
      {
        id: "oiq112032",
        answer: "Orqa tomonni rivojlantirish freymorki",
        isCorrect: false,
      },
      {
        id: "oiq112033",
        answer: "Mobil ilovalar yaratish uchun vosita",
        isCorrect: false,
      },
      { id: "oiq112034", answer: "CSS freymorki", isCorrect: false },
    ],
  },
  {
    id: "asd123",
    question: "JavaScript nima?",
    answer: [
      {
        id: "asd1231",
        answer: "Veb-sahifalarni interaktiv qilish uchun dasturlash tili",
        isCorrect: true,
      },
      { id: "asd1232", answer: "Server dasturlash tili", isCorrect: false },
      {
        id: "asd1233",
        answer: "Mobil ilovalar yaratish uchun dasturlash tili",
        isCorrect: false,
      },
      {
        id: "asd1234",
        answer: "Fayl tizimlarini boshqarish tili",
        isCorrect: false,
      },
    ],
  },
  {
    id: "zxc456",
    question: "CSS nima?",
    answer: [
      {
        id: "zxc4561",
        answer: "Veb-sahifalarning ko'rinishini belgilovchi til",
        isCorrect: true,
      },
      { id: "zxc4562", answer: "Dasturlash tili", isCorrect: false },
      {
        id: "zxc4563",
        answer: "Ma'lumotlar bazasini boshqarish tili",
        isCorrect: false,
      },
      {
        id: "zxc4564",
        answer: "Veb-ilovalar uchun backend tili",
        isCorrect: false,
      },
    ],
  },
  {
    id: "qaz789",
    question: "HTML nima?",
    answer: [
      {
        id: "qaz7891",
        answer: "Veb-sahifalar tuzilishini belgilovchi til",
        isCorrect: true,
      },
      { id: "qaz7892", answer: "Server dasturlash tili", isCorrect: false },
      {
        id: "qaz7893",
        answer: "Mobil ilovalar yaratish uchun dasturlash tili",
        isCorrect: false,
      },
      {
        id: "qaz7894",
        answer: "Veb-sahifalarni animatsiya qilish tili",
        isCorrect: false,
      },
    ],
  },
];

const Quiz = ({ params }: { params: { quiz: string } }) => {
  console.log(params.quiz);

  const router = useRouter();

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  // Savollarni tasodifiy tartibda joylash
  useEffect(() => {
    const shuffleArray = (array: Question[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledQuestions = shuffleArray([...questions]);

    shuffledQuestions.forEach(question => {
      question.answer = shuffleArray([...question.answer]); // Variantlarni aralashtirish
    });

    setShuffledQuestions(shuffledQuestions);
  }, []);

  const handleAnswerClick = (answer: Answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer.id);
      setIsAnswerCorrect(answer.isCorrect);

      if (answer.isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      setShowScore(true);

      // Foizni hisoblash
      const percentage = calculatePercentage();
      if (percentage >= 80) {
        // Mavjud 'lesson' qiymatlarini olish yoki bo'sh ob'ekt yaratish
        const existingLessons = JSON.parse(
          localStorage.getItem("lesson") || "{}"
        );

        // Agar 'lesson2' qiymati hali mavjud bo'lmasa, uni qo'shish
        if (!existingLessons.lesson2) {
          existingLessons.lesson2 = true;
        }

        // Yangilangan 'lesson' ma'lumotlarini localStorage'ga saqlash
        localStorage.setItem("lesson", JSON.stringify(existingLessons));
      }
    }
  };

  const calculatePercentage = () => {
    return (score / shuffledQuestions.length) * 100; // Foizni hisoblash
  };

  console.log(calculatePercentage());

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-popover">
        {showScore ? (
          <div className="score-section text-center text-lg font-semibold">
            Siz {score}/{shuffledQuestions.length} ball to`pladingiz (
            {calculatePercentage()}%)
            <button
              onClick={() => router.push("/home")}
              className="w-full p-3 bg-blue-500 text-white rounded-lg mt-5 hover:bg-blue-600 transition duration-200"
            >
              Mavzular
            </button>
          </div>
        ) : (
          <>
            <div className="question-section mb-4">
              <h2 className="text-xl font-bold">
                Savol {currentQuestion + 1}/{shuffledQuestions.length}
              </h2>
              <p className="mt-2">
                {shuffledQuestions[currentQuestion]?.question}
              </p>
            </div>
            <div className="answer-section">
              {shuffledQuestions[currentQuestion]?.answer.map(answer => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerClick(answer)}
                  className={`w-full mb-2 p-3 rounded-lg transition duration-200 ${
                    selectedAnswer === answer.id
                      ? isAnswerCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {answer.answer}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <button
                onClick={handleNextQuestion}
                className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200 mt-4"
              >
                Keyingi savol
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
