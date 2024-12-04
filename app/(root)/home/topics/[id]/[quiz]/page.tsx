"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { lessons } from "@/constants";
import { Answer, Question } from "@/constants/quiz";
import { IBlog } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Quiz = ({ params }: { params: { quiz: string } }) => {
  const router = useRouter();

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [data, setData] = useState<IBlog>();

  // Savollarni va variantlarni tasodifiy tartibda joylash
  useEffect(() => {
    // Tasodifiy aralashtirish funksiyasi
    const shuffleArray = <T,>(array: T[]): T[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Lessonni topish va quiz ma'lumotlarini o'rnatish
    lessons.map(lesson => {
      if (lesson.id === params.quiz) {
        setData(lesson);
        const shuffled = shuffleArray([...lesson.questions]); // Savollarni aralashtirish
        shuffled.forEach(question => {
          question.answer = shuffleArray([...question.answer]); // Javoblarni aralashtirish
        });
        setShuffledQuestions(shuffled);
      }
    });
  }, [params.quiz]);

  // Javob tanlash funksiyasi
  const handleAnswerClick = (answer: Answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer.id);
      setIsAnswerCorrect(answer.isCorrect);

      if (answer.isCorrect) {
        setScore(score + 1);
      }
    }
  };

  // Keyingi savolga o'tish funksiyasi
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

  // Foizni hisoblash funksiyasi
  const calculatePercentage = () => {
    return Math.floor((score / shuffledQuestions.length) * 100);
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20 bg-gradient-to-r from-blue-300 via-pink-200 to-yellow-200 ">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-popover">
        {showScore ? (
          <div className="score-section text-center text-lg font-semibold">
            Siz {score}/{shuffledQuestions.length} ball to`pladingiz (
            {calculatePercentage()}%)
            <Progress value={calculatePercentage()} className="mt-4" />
            <Button
              variant={"secondary"}
              onClick={() => router.push("/home")}
              className="w-full mt-5"
            >
              Mavzular
            </Button>
            <Button
              variant={"default"}
              onClick={() =>
                router.push(`/home/topics/${data?.slug}/algo/${data?.id}`)
              }
              className="w-full mt-2"
            >
              Algoritm
            </Button>
          </div>
        ) : (
          <>
            <div className="question-section mb-4">
              <h2 className="text-xl font-bold">
                Savol {currentQuestion + 1}/{shuffledQuestions.length}
              </h2>

              <div className="flex flex-wrap gap-4">
                {data?.quizImg.map((img, index) => {
                  return (
                    <Image
                      key={index}
                      src={img}
                      width={600}
                      height={150}
                      className="object-cover w-full min-h-20 rounded-lg shadow-lg"
                      alt={`Image ${index}`}
                    />
                  );
                })}
              </div>

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
