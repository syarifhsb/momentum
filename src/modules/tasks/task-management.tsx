import { useState } from "react";
import { HeadingTwo } from "@/components/ui/typography";
import {
  getTasksCount,
  getSyncedTasks,
  syncTasks,
  createTaskData,
} from "@/modules/tasks/task";
import { Button } from "@/components/ui/button";
import { TaskCards } from "@/components/shared/task-cards";

export function TaskManagement() {
  const [tasks, setTasks] = useState(getSyncedTasks());
  const tasksCount = getTasksCount(tasks);

  function addTask() {
    const newTask = createTaskData(tasks, {
      title: `Task ${tasks.length + 1}`,
      description: `Description for Task ${tasks.length + 1}`,
      category: "General",
    });

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    syncTasks(updatedTasks);
  }

  function deleteTasks() {
    setTasks([]);
    syncTasks([]);
  }

  return (
    <main className="p-3 flex justify-center">
      <div className="w-full max-w-lg space-y-4">
        <section id="panel" className="flex justify-between">
          <div>
            <HeadingTwo>Tasks</HeadingTwo>
            {tasksCount <= 0 && (
              <p className="text-green-700">
                Good job! You have no tasks remaining.
              </p>
            )}
            {tasksCount > 0 && <p>You have {tasksCount} tasks remaining.</p>}
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={addTask}>
              Add Task
            </Button>
            <Button size="sm" onClick={deleteTasks} variant={"destructive"}>
              Delete Tasks
            </Button>
          </div>
        </section>

        <section id="tasks">
          <TaskCards tasks={tasks} />
        </section>
      </div>
    </main>
  );
}
