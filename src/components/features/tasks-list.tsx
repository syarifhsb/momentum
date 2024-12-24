import { Task, useTasks } from "@/features/task";

export function TasksList() {
  const tasks = useTasks();

  return (
    <div>
      {tasks.length <= 0 && <p>No tasks yet</p>}
      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TaskItem({ task }: { task: Task }) {
  return (
    <li>
      <h2>{task.title}</h2>
      <p>{task.category}</p>
      <p>{task.description || "No description"}</p>
    </li>
  );
}
