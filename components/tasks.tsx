type Task = {
  taskId: number;
  taskName: string;
};

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks;
}

export function Tasks() {
  console.log(loadTasks());
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {loadTasks().map((task: Task) => (
          <li key={task.taskId}>{task.taskName}</li>
        ))}
      </ul>
    </div>
  );
}
