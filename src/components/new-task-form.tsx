import { loadTasks, saveTasks } from "../features/task";

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const tasks = loadTasks();
  const formData = new FormData(event.currentTarget);
  const newTaskData = Object.fromEntries(formData.entries());

  saveTasks([
    ...tasks,
    {
      id:
        tasks.length > 0 && tasks[tasks.length - 1]?.id !== undefined
          ? tasks[tasks.length - 1].id + 1
          : 0,
      title: newTaskData["title"].toString(),
    },
  ]);

  window.location.href = `/`;
}

export function NewTaskForm() {
  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <h2>New Task</h2>
        <label htmlFor="title">Task title</label>
        <input type="text" id="title" name="title" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
