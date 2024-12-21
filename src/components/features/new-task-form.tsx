import * as React from "react";
import { saveTasks, useTasks, generateId } from "@/features/task";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NewTaskForm() {
  const tasks = useTasks();
  const [isTitleEmpty, setIsTitleEmpty] = React.useState(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputData = event.currentTarget.value;

    setIsTitleEmpty(inputData.toString().trim() === "");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTaskData = Object.fromEntries(formData.entries());

    saveTasks([
      ...tasks,
      {
        id: generateId(tasks),
        title: newTaskData["title"].toString(),
        description: newTaskData["description"].toString(),
        category: newTaskData["category"].toString(),
      },
    ]);

    window.location.href = `/`;
  }
  return (
    <div>
      <Card className="w-[350px]">
        <form method="post" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create new task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">New Task</Label>
                <Input
                  name="title"
                  id="title"
                  onChange={handleChange}
                  placeholder="Helping grandma"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Cutting the grass"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select name="category">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="ml-auto">
              <Button type="submit" disabled={isTitleEmpty}>
                Create
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
