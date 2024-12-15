type Task = {
  taskName: string;
};

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks;
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const formJson = Object.fromEntries(formData.entries());
  const tasks = loadTasks();
  saveTasks([
    ...tasks,
    {
      taskId:
        tasks.length > 0 && tasks[tasks.length - 1]?.taskId !== undefined
          ? tasks[tasks.length - 1].taskId + 1
          : 0,
      taskName: formJson["task-name"],
    },
  ]);
  window.location.href = `/`;
}

export function NewTaskForm() {
  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <h2>New Task</h2>
        <label htmlFor="task-name">Task Name</label>
        <input type="text" id="task-name" name="task-name" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
