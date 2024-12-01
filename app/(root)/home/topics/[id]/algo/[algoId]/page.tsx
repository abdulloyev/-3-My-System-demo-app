"use client";

import React, { useEffect, useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Column from "../_components/column";
import { arrayMove } from "@dnd-kit/sortable";
import { lessons } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ITask } from "@/types";
import { Progress } from "@/components/ui/progress";

const Sections = ({ params }: { params: { algoId: string } }) => {
  // Hooks
  const [tasks, setTasks] = useState<ITask[] | []>([]); // Hozirgi obyektning tasklari
  const [taskInfo, setTaskInfo] = useState({
    totalTasks: 0,
    currentTaskIndex: 0,
  }); // Umumiy va hozirgi task haqida ma'lumot
  const [score, setScore] = useState(0); // Umumiy ballni hisoblash uchun
  const [isCompleted, setIsCompleted] = useState(false); // Barcha obyektlar tugagani
  const router = useRouter();

  // Tasodifiylashtirish funksiyasi
  const shuffleArray = (array: ITask[]): ITask[] => {
    return array
      .map(item => ({ ...item, sortKey: Math.random() })) // Har bir elementga tasodifiy qiymat qo'shish
      .sort((a, b) => a.sortKey - b.sortKey) // Tasodifiy qiymat bo‘yicha tartiblash
      .map(({ sortKey, ...item }) => item); // Tasodifiy qiymatni olib tashlash
  };

  useEffect(() => {
    const lesson = lessons.find(lesson => lesson.id === params.algoId);
    if (lesson && !isCompleted) {
      const shuffledTasks = shuffleArray(
        lesson.tasks[taskInfo.currentTaskIndex]
      ); // Tasodifiylashtirish
      setTasks(shuffledTasks); // Tasklarni tasodifiy shaklda o‘rnatish
      setTaskInfo({
        totalTasks: lesson.tasks.length,
        currentTaskIndex: taskInfo.currentTaskIndex,
      }); // Umumiy va hozirgi tasklarni yangilash
    }
  }, [params.algoId, taskInfo.currentTaskIndex, isCompleted]);

  // Tekshirish uchun handleCheck funksiyasi
  const handleCheck = () => {
    const isOrderedCorrectly = tasks.every(
      (task, index) => task.id === `t${index + 1}`
    );

    if (isOrderedCorrectly) {
      setScore(prevScore => prevScore + 1); // To‘g‘ri bo‘lsa, ballni oshirish
    }

    // Keyingi obyektga o'tish yoki tugatish
    if (taskInfo.currentTaskIndex < taskInfo.totalTasks - 1) {
      setTaskInfo(prevInfo => ({
        ...prevInfo,
        currentTaskIndex: prevInfo.currentTaskIndex + 1,
      })); // Keyingi obyektga o‘tish
    } else {
      setIsCompleted(true); // Tugatish holatini o‘rnatish
    }
  };

  const getTaskPos = (id: string) => tasks.findIndex(task => task.id === id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks(prevTasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(prevTasks, originalPos, newPos);
    });
  };

  return (
    <div
      className={cn(
        isCompleted && "flex justify-center items-center",
        "bg-gradient-to-r from-blue-300 via-pink-200 to-yellow-200 min-h-screen"
      )}
    >
      {isCompleted ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Natija</h1>
          <p className="text-lg">
            Sizning umumiy ballingiz:{" "}
            <span className="text-blue-500 font-bold">{score}</span>
          </p>

          <Progress
            value={(taskInfo.currentTaskIndex / taskInfo.totalTasks) * 100}
            className="mt-4"
          />

          <p className="text-sm text-gray-500 mt-2">
            {taskInfo.totalTasks} task bo‘yicha baholandi.
          </p>

          <Button
            onClick={() => router.push("/home")}
            variant={"secondary"}
            className="w-full p-3 rounded-lg mt-5  transition duration-200"
          >
            Mavzular
          </Button>
        </div>
      ) : (
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <Column tasks={tasks} handleCheck={handleCheck} taskInfo={taskInfo} />
        </DndContext>
      )}
    </div>
  );
};

export default Sections;
