import { NewTaskForm } from "@/components/features/new-task-form";
import { ExistingTasks } from "@/components/features/exisiting-tasks";
import { HeadingOne } from "@/components/features/typography";

export function TaskManagement() {
  return (
    <div>
      <HeadingOne>Task Management</HeadingOne>
      <ExistingTasks />
      <NewTaskForm />
    </div>
  );
}
