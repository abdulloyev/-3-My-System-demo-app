import { ITask } from "@/types";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TextSelect } from "lucide-react";

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-lg shadow-lg w-full px-4 py-5 flex items-center justify-start "
    >
      <TextSelect size={"20px"} />
      <span className="pl-3">{task.title}</span>
    </div>
  );
};

export default Task;
