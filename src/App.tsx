import { NewTaskForm } from "./components/new-task-form";
import { TasksSection } from "./components/tasks-section";
import { loadTasks } from "./features/task";

export function App() {
  const tasks = loadTasks();

  return (
    <div>
      <h1>My Task Management App</h1>

      <NewTaskForm tasks={tasks} />

      <TasksSection tasks={tasks} />
    </div>
  );
}
