import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { syncToLocalStorage, generateId, Task } from "@/modules/task";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function NewTaskForm({
  tasks,
  noOfTasks,
  setNoOfTasks,
  editTask,
  setEditTask,
  formOpen,
  setFormOpen,
}: {
  tasks: Task[];
  noOfTasks: number;
  setNoOfTasks: React.Dispatch<React.SetStateAction<number>>;
  editTask?: Task;
  setEditTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const [datepickerOpen, setDatepickerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();

  function handleOpenChange(open: boolean) {
    setFormOpen(open);
    if (!open) {
      setEditTask(undefined);
    }
  }

  function handleDateButtonClick(
    event: React.MouseEvent<HTMLButtonElement>,
    date: Date
  ) {
    event.preventDefault();
    setDate(date);
    setDatepickerOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTaskData = Object.fromEntries(formData.entries());

    if (editTask) {
      syncToLocalStorage(
        tasks.map((task) => {
          if (task.id === editTask.id) {
            task.title = newTaskData["title"].toString();
            task.description = newTaskData["description"].toString();
            task.category = newTaskData["category"].toString();
            task.date = date;
            return task;
          } else {
            return task;
          }
        })
      );
    } else {
      syncToLocalStorage([
        ...tasks,
        {
          id: generateId(tasks),
          title: newTaskData["title"].toString(),
          description: newTaskData["description"].toString(),
          category: newTaskData["category"].toString(),
          // Question: Doesn't obtain the date from the form. Is this okay?
          date: date,
        },
      ]);
      setNoOfTasks(noOfTasks + 1);
    }

    toast("Task has been created", {
      description: newTaskData["title"].toString(),
    });

    setFormOpen(false);
    setEditTask(undefined);
    setIsTitleEmpty(true);
    setTitle("");
    setDescription("");
    setCategory("");
    setDate(undefined);
  }

  // Question: Why is this needed? I don't know how it works.
  useEffect(() => {
    if (editTask) {
      setIsTitleEmpty(editTask.title.trim() === "");
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setCategory(editTask.category || "");
      setDate(editTask.date);
    }
  }, [editTask]);

  return (
    <Dialog open={formOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Create New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editTask ? "Modify task" : "Create new task"}
          </DialogTitle>
          <DialogDescription hidden>Submit your new task.</DialogDescription>
        </DialogHeader>
        <form method="post" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                id="title"
                onChange={(event) => {
                  setTitle(event.currentTarget.value);
                  setIsTitleEmpty(
                    event.currentTarget.value.toString().trim() === ""
                  );
                }}
                value={title}
                placeholder="New Task"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger
                  id="category"
                  className={!category ? "text-muted-foreground" : ""}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5 pb-4">
              <Label htmlFor="date">Deadline</Label>
              <Popover open={datepickerOpen} onOpenChange={setDatepickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-popover text-popover-foreground rounded-sm shadow-lg p-1 border"
                  align="start"
                >
                  <Button
                    variant="secondary"
                    onClick={(event) =>
                      handleDateButtonClick(event, new Date())
                    }
                  >
                    Today
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={(event) =>
                      handleDateButtonClick(event, addDays(new Date(), 1))
                    }
                  >
                    Tomorrow
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={(event) =>
                      handleDateButtonClick(event, addDays(new Date(), 7))
                    }
                  >
                    Next Week
                  </Button>
                  <Calendar
                    className="rounded-md border shadow"
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setDatepickerOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button className="w-full" type="submit" disabled={isTitleEmpty}>
              {editTask ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
