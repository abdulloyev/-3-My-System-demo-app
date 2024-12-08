import { IBlog, ITask } from "@/types";
import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./task";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  oneLesson: IBlog | undefined;
  tasks: ITask[];
  handleCheck: () => void;
  taskInfo: {
    totalTasks: number;
    currentTaskIndex: number;
  };
}

const Column = ({ tasks, handleCheck, taskInfo, oneLesson }: Props) => {
  return (
    <div className="flex justify-center items-center min-h-screen py-20">
      <div className="p-8 rounded-lg bg-popover shadow-lg mx-4 w-[500px] sm:w-3/4 lg:w-1/2">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <h2 className="text-xl font-black pb-3">
            Algoritm {taskInfo.currentTaskIndex + 1}/{taskInfo.totalTasks}
          </h2>

          {oneLesson?.quizImg && (
            <div className="flex flex-wrap gap-4">
              <Image
                src={oneLesson?.quizImg[0]}
                width={400}
                height={150}
                className="object-cover w-[500px] text-center min-h-20 rounded-lg shadow-lg"
                alt={`Image algo`}
              />
            </div>
          )}

          <div className="mt-11">
            {tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-center my-3 rounded-lg shadow-md hover:bg-indigo-50 transition-colors duration-300 w-full"
              >
                <Task task={task} />
              </div>
            ))}

            <Button
              className="w-full py-6"
              variant={"default"}
              onClick={handleCheck}
            >
              Tekshirish
            </Button>
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
