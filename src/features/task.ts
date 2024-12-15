export type Task = {
  id: number;
  title: string;
  description?: string;
};

export function loadTasks() {
  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks;
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
