import { generateId, saveTasks, type Task } from "../features/task";

export function NewTaskForm({ tasks }: { tasks: Task[] }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTaskData = Object.fromEntries(formData.entries());

    saveTasks([
      ...tasks,
      {
        id: generateId(tasks),
        title: newTaskData["title"].toString(),
      },
    ]);

    window.location.href = `/`;
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <h2>New Task</h2>

        <div>
          <label htmlFor="title">Task title</label>
          <input type="text" id="title" name="title" required />
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
