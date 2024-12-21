import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateId, saveTasks, useTasks } from "@/features/task";

export function NewTaskForm() {
  const tasks = useTasks();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTaskData = Object.fromEntries(formData.entries());

    saveTasks([
      ...tasks,
      {
        id: generateId(tasks),
        title: newTaskData["title"].toString(),
        category: newTaskData["category"].toString(),
      },
    ]);

    window.location.href = `/`;
  }

  return (
    <Card className="w-[350px]">
      <form method="post" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>New task</CardTitle>
          <CardDescription>Describe your new task</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Title of your task" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="fun">Fun</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="submit">Add Task</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
