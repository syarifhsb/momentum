import * as React from "react";
import { NewTaskForm } from "@/components/features/new-task-form";
import { ExistingTasks } from "@/components/features/exisiting-tasks";
import { HeadingOne } from "@/components/features/typography";
import { Button } from "@/components/ui/button";

export function TaskManagement() {
  const [openNewTaskForm, setOpenNewTaskForm] = React.useState(false);

  return (
    <div className="p-3">
      <HeadingOne className="text-center p-2">Momentum</HeadingOne>
      <p className="text-center p-2 pt-0">A simple task management app.</p>
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        {openNewTaskForm ? (
          <NewTaskForm setCloseForm={() => setOpenNewTaskForm(false)} />
        ) : (
          <Button onClick={() => setOpenNewTaskForm(true)}>
            Create New Task
          </Button>
        )}
        {/* <NewTaskForm /> */}
        <ExistingTasks />
      </div>
    </div>
  );
}
