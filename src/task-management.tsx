import { NewTaskForm } from "./components/features/new-task-form";
import { useTasks } from "./features/task";

export function TaskManagement() {
  const tasks = useTasks();

  return (
    <div>
      <h1>Tasks</h1>

      <div>
        <NewTaskForm />
      </div>

      <div>
        {tasks.length <= 0 && <p>No tasks yet</p>}
        {tasks.length > 0 && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h2>{task.title}</h2>
                <p>{task.category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
