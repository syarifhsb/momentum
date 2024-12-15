import { NewTaskForm } from "./new-task-form";
import { Tasks } from "./tasks";

export function MainWindow() {
  return (
    <div>
      <NewTaskForm />
      <Tasks />
    </div>
  );
}
