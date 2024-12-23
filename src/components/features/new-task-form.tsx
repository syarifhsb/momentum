import * as React from "react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { saveTasks, generateId, Task } from "@/features/task";
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

export function NewTaskForm({
  tasks,
  noOfTasks,
  setNoOfTasks,
}: {
  tasks: Task[];
  noOfTasks: number;
  setNoOfTasks: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isTitleEmpty, setIsTitleEmpty] = React.useState(true);
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [datepickerOpen, setDatepickerOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputData = event.currentTarget.value;

    setIsTitleEmpty(inputData.toString().trim() === "");
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

    console.log(event.currentTarget);
    const formData = new FormData(event.currentTarget);
    const newTaskData = Object.fromEntries(formData.entries());

    saveTasks([
      ...tasks,
      {
        id: generateId(tasks),
        title: newTaskData["title"].toString(),
        description: newTaskData["description"].toString(),
        category: newTaskData["category"].toString(),
        date: date,
      },
    ]);

    setFormOpen(false);
    // window.location.href = `/`;
    setNoOfTasks(noOfTasks + 1);
  }

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription hidden>Create a new task</DialogDescription>
        </DialogHeader>
        <form method="post" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                id="title"
                onChange={handleChange}
                placeholder="New Task"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Description"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
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
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
