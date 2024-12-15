import { generateId, saveTasks, type Task } from "../features/task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

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
          <Label htmlFor="title">Task title</Label>
          <Input type="text" id="title" name="title" required />
        </div>

        <div>
          <Label htmlFor="description">Task description</Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            required
          ></Textarea>
        </div>

        <Button type="submit">Add Task</Button>
      </form>
    </div>
  );
}
