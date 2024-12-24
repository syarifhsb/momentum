import { NewTaskForm } from "@/components/features/new-task-form";
import { ExistingTasks } from "@/components/features/existing-tasks";
import { HeadingOne } from "@/components/features/typography";
import { useState } from "react";
import { Task, useTasks } from "./features/task";

export function TaskManagement() {
  const tasks = useTasks();
  const [noOfTasks, setNoOfTasks] = useState(tasks.length);
  const [editTask, setEditTask] = useState<Task>();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="p-3">
      <HeadingOne className="text-center p-2">Momentum</HeadingOne>
      <p className="text-center p-2 pt-0">A simple task management app.</p>
      <div className="flex flex-col items-center gap-4 ">
        <NewTaskForm
          tasks={tasks}
          noOfTasks={noOfTasks}
          setNoOfTasks={setNoOfTasks}
          editTask={editTask}
          setEditTask={setEditTask}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        />
        <ExistingTasks
          tasks={tasks}
          noOfTasks={noOfTasks}
          setNoOfTasks={setNoOfTasks}
          setEditTask={setEditTask}
          setFormOpen={setFormOpen}
        />
      </div>
    </div>
  );
}
