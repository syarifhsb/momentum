import { NewTaskForm } from "./components/new-task-form";
import { TasksSection } from "./components/tasks-section";
import { Button } from "./components/ui/button";
import { HeadingOne } from "./components/ui/heading";
import { loadTasks } from "./features/task";

export function App() {
  const tasks = loadTasks();

  return (
    <div>
      <HeadingOne>My Task Management App</HeadingOne>
      <Button>Hello</Button>

      <NewTaskForm tasks={tasks} />

      <TasksSection tasks={tasks} />
    </div>
  );
}
