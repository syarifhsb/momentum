export type Task = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  date?: Date;
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

export function createTaskData(tasks: Task[], formData: any) {
  return {
    id: tasks.length + 1,
    title: formData.title,
    description: formData.description,
    category: formData.category,
    isDone: false,
    date: new Date(),
  };
}
