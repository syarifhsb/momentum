import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { HeadingTwo } from "@/components/ui/typography";
import {
  getTasksCount,
  getSyncedTasks,
  syncTasks,
  createTaskData,
  Task,
} from "@/modules/tasks/task";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/shared/task-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

export function TaskManagement() {
  const [tasks, setTasks] = useState(getSyncedTasks());
  const tasksCount = getTasksCount(tasks);

  function seedTasksState() {
    const newTask: Task = {
      id: tasks.length + 1,
      title: `Task ${tasks.length + 1}`,
      description: `Description for Task ${tasks.length + 1}`,
      category: "General",
      date: new Date(),
      isDone: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    syncTasks(updatedTasks);
  }

  function addTaskState(newTask: Task) {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    syncTasks(updatedTasks);
  }

  function deleteTaskState(taskId: number) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    syncTasks(updatedTasks);
  }

  function deleteTasksState() {
    setTasks([]);
    syncTasks([]);
  }

  function updateTaskState(updatedTask: Task) {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    syncTasks(updatedTasks);
  }

  return (
    <main className="p-3 flex justify-center">
      <div className="w-full max-w-lg space-y-4">
        <section id="panel" className="flex justify-between">
          <div>
            <HeadingTwo>Tasks</HeadingTwo>
            {tasksCount <= 0 && (
              <p className="text-green-700">
                Good job! You have no tasks remaining.
              </p>
            )}
            {tasksCount > 0 && <p>You have {tasksCount} tasks remaining.</p>}
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={seedTasksState}>
              Seed Tasks
            </Button>
            <DialogAddTask addTaskState={addTaskState} />
            <Button
              size="sm"
              onClick={deleteTasksState}
              variant={"destructive"}
            >
              Delete Tasks
            </Button>
          </div>
        </section>

        <section id="tasks">
          <ul className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                updateTaskState={updateTaskState}
                deleteTaskState={deleteTaskState}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export function DialogAddTask({
  addTaskState,
}: {
  addTaskState: (task: Task) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  function handleSubmitTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const createdTask = createTaskData(formData);

      addTaskState(createdTask);
      setOpen(false);
    } catch (error: Error | any) {
      toast.error("Failed to add task", { description: error.message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitTask}>
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
            <DialogDescription hidden>Add a new task details</DialogDescription>
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
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="date">Date</Label>
            <input
              hidden
              name="date"
              type="text"
              defaultValue={selectedDate?.toString()}
              // OPTION: Format from date string into YYYY-MM-DD if the type="date"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
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
