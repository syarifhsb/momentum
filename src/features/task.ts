export type Task = {
  id: number;
  title: string;
  description?: string;
};

export function generateId(tasks: Task[]) {
  return tasks.reduce((maxId, task) => Math.max(task.id, maxId), 0) + 1;
}

export function loadTasks() {
  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks;
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
