import { loadTasks } from "../features/task";

export function TasksContainer() {
  const tasks = loadTasks();

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.length <= 0 && <p>No tasks yet.</p>}

      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
