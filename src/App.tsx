import { NewTaskForm } from "./components/new-task-form";
import { TasksContainer } from "./components/tasks-container";

export function App() {
  return (
    <div>
      <h1>My Task Management App</h1>

      <NewTaskForm />

      <TasksContainer />
    </div>
  );
}
