export type Task = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  date: Date | undefined;
  isDone: boolean;
};

export function generateId(tasks: Task[]) {
  return tasks.reduce((maxId, task) => Math.max(task.id, maxId), 0) + 1;
}

export function getSyncedTasks() {
  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks.map((task) => ({
    ...task,
    date: task.date ? new Date(task.date) : undefined,
  }));
}

export function syncTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasksCount(tasks: Task[]) {
  return tasks.length;
}

export function getTaskById(id: number) {
  const tasks = getSyncedTasks();
  return tasks.find((task) => task.id === id);
}

export function createTaskData(formData: FormData): Task | null {
  const tasks = getSyncedTasks();
  const hasDate = Boolean(formData.get("date"));

  const newTask = {
    id: generateId(tasks),
    title: String(formData.get("title")),
    description: formData.get("description")?.toString(),
    category: formData.get("category")?.toString(),
    date: hasDate ? new Date(String(formData.get("date"))) : undefined,
    isDone: false,
  };
  return newTask;
}

export function updateTaskData(task: Task, formData: FormData): Task | null {
  const hasDate = Boolean(formData.get("date"));

  const updatedTask = {
    id: task.id,
    title: formData.get("title")?.toString() || task.title,
    description: formData.get("description")?.toString() || task.description,
    category: formData.get("category")?.toString() || task.category,
    date: hasDate ? new Date(String(formData.get("date"))) : task.date,
    isDone: task.isDone,
  };
  return updatedTask;
}
