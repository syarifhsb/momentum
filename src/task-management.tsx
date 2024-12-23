import { NewTaskForm } from "@/components/features/new-task-form";
import { ExistingTasks } from "@/components/features/exisiting-tasks";
import { HeadingOne } from "@/components/features/typography";

export function TaskManagement() {
  return (
    <div className="p-3">
      <HeadingOne className="text-center p-2">Momentum</HeadingOne>
      <p className="text-center p-2 pt-0">A simple task management app.</p>
      <div className="flex flex-row gap-4">
        <NewTaskForm />
        <ExistingTasks />
      </div>
    </div>
  );
}
