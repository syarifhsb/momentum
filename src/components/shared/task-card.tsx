import { format } from "date-fns";
import { CalendarIcon, X as IconX } from "lucide-react";

import { Task, updateTaskData } from "@/modules/tasks/task";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { formatDate } from "@/lib/datetime";

import {
  Select,
  SelectButtonTrigger,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export function TaskCard({
  task,
  updateTaskState,
  deleteTaskState,
}: {
  task: Task;
  updateTaskState: (task: Task) => void;
  deleteTaskState: (taskId: number) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div>{task.description}</div>
      </CardContent>

      <CardFooter className="flex gap-4">
        <div className="flex gap-1">
          <Select>
            <SelectButtonTrigger
              size={"xs"}
              variant={"secondary"}
              className={cn(
                "w-[100px] border-none",
                !task.category && "text-muted-foreground"
              )}
            >
              <SelectValue placeholder={task.category || "Category"} />
            </SelectButtonTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="home">Home</SelectItem>
            </SelectContent>
          </Select>

          {task.category && (
            <Button size="icon-xs" variant={"secondary"}>
              <IconX />
            </Button>
          )}
        </div>

        <TaskDatePicker task={task} updateTaskState={updateTaskState} />

        <Button
          size="xs"
          variant={"destructive"}
          onClick={() => deleteTaskState(task.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export function TaskDatePicker({
  task,
  updateTaskState,
}: {
  task: Task;
  updateTaskState: (task: Task) => void;
}) {
  function handleSelectDate(selectedDate: Date | undefined) {
    updateTaskState({ ...task, date: selectedDate });

    if (selectedDate) {
      toast("Selected date", { description: formatDate(selectedDate) });
    } else {
      toast("Removed date");
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="xs"
          variant={"secondary"}
          className={cn(
            "w-[180px] pl-3 text-left font-normal",
            !task.date && "text-muted-foreground"
          )}
        >
          {task.date ? format(task.date, "PPP") : <span>Pick a task date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={task.date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function DialogNewTask({
  task,
  updateTaskState,
}: {
  task: Task;
  updateTaskState: (task: Task) => void;
}) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  function handleSubmitTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const updatedTask = updateTaskData(task.id, formData);
      updateTaskState(updatedTask);
      setOpen(false);
    } catch (error: Error | any) {
      toast.error("Failed to update task", { description: error.message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Update Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitTask}>
          <DialogHeader>
            <DialogTitle>Update new task</DialogTitle>
            <DialogDescription hidden>
              Update existing task details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              name="title"
              required
              id="title"
              placeholder="Eat some breakfast"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Describe the breakfast you want to eat"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder={"Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="date">Date</Label>
            <input
              hidden
              name="date"
              type="date"
              defaultValue={date?.toString()}
              // only being used when submitted
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button className="w-full" type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
