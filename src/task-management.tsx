import { NewTaskForm } from "@/components/features/new-task-form";
import { TasksList } from "@/components/features/tasks-list";

export function TaskManagement() {
  return (
    <div>
      <h1>Tasks</h1>

      <div>
        <NewTaskForm />
        <TasksList />
      </div>
    </div>
  );
}
