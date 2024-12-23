import * as React from "react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

export function NewTaskForm({ setCloseForm }: { setCloseForm: () => void }) {
  const tasks = useTasks();
  const [isTitleEmpty, setIsTitleEmpty] = React.useState(true);
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [datepickerOpen, setDatepickerOpen] = React.useState(false);

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

    setCloseForm();
    window.location.href = `/`;
  }

  return (
    <Card className="w-[350px]">
      <form method="post" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create new task</CardTitle>
        </CardHeader>
        <CardContent>
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
            <div className="flex flex-col space-y-1.5">
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
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <Button variant="outline" onClick={setCloseForm}>
            Cancel
          </Button>
          <Button type="submit" disabled={isTitleEmpty}>
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
