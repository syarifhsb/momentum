import { useState } from "react";
import { HeadingTwo } from "@/components/ui/typography";
import { getTasksCount, getSyncedTasks } from "@/modules/tasks/task";
import { Button } from "@/components/ui/button";
import { TaskCards } from "@/components/shared/task-cards";

export function TaskManagement() {
  const [tasks, setTasks] = useState(getSyncedTasks());
  const tasksCount = getTasksCount(tasks);

  function addTask() {
    const newTask = {
      id: tasks.length + 1,
      title: `Task ${tasks.length + 1}`,
      isDone: false,
      date: new Date(),
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <main className="p-3 flex justify-center">
      <div>
        <section className="w-full max-w-lg flex justify-between">
          <div>
            <HeadingTwo>Tasks</HeadingTwo>
            {tasksCount <= 0 && (
              <p className="text-green-700">
                Good job! You have no tasks remaining.
              </p>
            )}
            {tasksCount > 0 && <p>You have {tasksCount} tasks remaining.</p>}
          </div>

          <div>
            <Button onClick={addTask}>Add Task</Button>
          </div>
        </section>

        <section>
          <TaskCards tasks={tasks} />
        </section>
      </div>
    </main>
  );
}
