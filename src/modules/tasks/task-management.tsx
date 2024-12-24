import { useState } from "react";
import { HeadingTwo } from "@/components/ui/typography";
import { getCountOfTasks, getSyncedTasks } from "@/modules/tasks/task";
import { Debug } from "@/components/ui/debug";
import { Button } from "@/components/ui/button";

export function TaskManagement() {
  const [tasks, setTasks] = useState(getSyncedTasks());

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
    <div className="p-3">
      <main className="flex justify-center">
        <section className="w-full max-w-lg">
          <HeadingTwo>Tasks</HeadingTwo>
          <p>You have {getCountOfTasks(tasks)} remaining tasks. </p>
        </section>

        <section>
          <Button onClick={addTask}>Add Task</Button>

          {/* CARDS */}
        </section>
      </main>

      <Debug>{tasks}</Debug>
    </div>
  );
}
