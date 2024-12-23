import * as React from "react";
import { NewTaskForm } from "@/components/features/new-task-form";
import { ExistingTasks } from "@/components/features/existing-tasks";
import { HeadingOne } from "@/components/features/typography";
import { useTasks } from "./features/task";

export function TaskManagement() {
  const tasks = useTasks();
  const [noOfTasks, setNoOfTasks] = React.useState(tasks.length);
  return (
    <div className="p-3">
      <HeadingOne className="text-center p-2">Momentum</HeadingOne>
      <p className="text-center p-2 pt-0">A simple task management app.</p>
      <div className="flex flex-col items-center gap-4 ">
        <NewTaskForm
          tasks={tasks}
          noOfTasks={noOfTasks}
          setNoOfTasks={setNoOfTasks}
        />
        <ExistingTasks
          tasks={tasks}
          noOfTasks={noOfTasks}
          setNoOfTasks={setNoOfTasks}
        />
      </div>
    </div>
  );
}
