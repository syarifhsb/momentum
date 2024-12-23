import * as React from "react";
import { addDays, format } from "date-fns";
import { saveTasks, Task, useTasks } from "@/features/task";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  EllipsisIcon,
  GroupIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = ["Personal", "Work", "Shopping", "Others"];

export function TaskCardItem({ task }: { task: Task }) {
  const tasks = useTasks();
  const [date, setDate] = React.useState<Date>();
  const [datepickerOpen, setDatepickerOpen] = React.useState(false);
  const [isTaskActive, setIsTaskActive] = React.useState(true);

  //   Question: SetCategory updates the UI, but linter does not like this method of updating the state.
  const [, setCategory] = React.useState("");

  function handleDateButtonClick(date: Date) {
    setDate(date);
    setDatepickerOpen(false);
    task.date = date;
    saveTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  }

  function handleChangeCategory(cat: string) {
    return () => {
      if (cat === "remove") {
        setCategory("");
        task.category = "";
      } else {
        setCategory(cat);
        task.category = cat;
      }

      saveTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    };
  }

  function handleDelete(task: Task) {
    return () => {
      setIsTaskActive(false);
      saveTasks(tasks.filter((t) => t.id !== task.id));
    };
  }

  return (
    <>
      {isTaskActive ? (
        <li>
          <Card className="min-w-[250px]">
            <CardContent className="p-3">
              <div className="flex flex-row gap-2 justify-between">
                <div>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <CardDescription>{task.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="h-6 w-6 data-[state=open]:bg-accent"
                      variant="ghost"
                      size="sm"
                    >
                      <EllipsisIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-32 bg-popover text-popover-foreground rounded-sm shadow-lg cursor-pointer p-1 border">
                    <DropdownMenuItem className="flex flex-row gap-2 p-0.5 items-center rounded-sm hover:bg-primary focus:bg-primary outline-none">
                      <PencilIcon className="h-3 w-3" />
                      <p className="text-sm">Edit</p>
                      <DropdownMenuShortcut>m</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex flex-row gap-2 p-0.5 items-center rounded-sm hover:bg-primary focus:bg-primary outline-none"
                      onSelect={handleDelete(task)}
                    >
                      <TrashIcon className="h-3 w-3" />
                      <p className="text-sm">Delete</p>
                      <DropdownMenuShortcut>d</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-row gap-2 mt-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="gap-1 h-6 data-[state=open]:bg-accent p-0.5 border"
                      variant="ghost"
                      size="sm"
                    >
                      <GroupIcon />
                      <p className="text-xs">
                        {task.category || "No Category"}
                      </p>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-20 bg-popover text-popover-foreground rounded-sm shadow-lg cursor-pointer p-1 border">
                    <DropdownMenuItem
                      onSelect={handleChangeCategory("remove")}
                      className="flex flex-row gap-1 p-0.5 items-center rounded-sm hover:bg-primary focus:bg-primary outline-none"
                      key="remove"
                    >
                      <TrashIcon className="h-3 w-3" />
                      <p className="text-xs">Remove Category</p>
                    </DropdownMenuItem>
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        onSelect={handleChangeCategory(cat)}
                        className="flex flex-row gap-1 p-0.5 items-center rounded-sm hover:bg-primary focus:bg-primary outline-none"
                        key={cat}
                      >
                        <GroupIcon className="h-3 w-3" />
                        <p className="text-xs">{cat}</p>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Popover open={datepickerOpen} onOpenChange={setDatepickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-xs gap-1 h-6 data-[state=open]:bg-accent p-0.5 border"
                    >
                      <CalendarIcon className="h-3 w-3" />
                      <p>
                        {task.date ? format(task.date, "PPP") : "No Deadline"}
                      </p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="bg-popover text-popover-foreground rounded-sm shadow-lg p-1 border"
                    align="center"
                  >
                    <div className="flex flex-row gap-1 ">
                      <Button
                        variant="secondary"
                        onClick={() => handleDateButtonClick(new Date())}
                      >
                        Today
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleDateButtonClick(addDays(new Date(), 1))
                        }
                      >
                        Tomorrow
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleDateButtonClick(addDays(new Date(), 7))
                        }
                      >
                        Next Week
                      </Button>
                    </div>
                    <Calendar
                      className="rounded-md border shadow"
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setDatepickerOpen(false);
                        if (newDate) {
                          handleDateButtonClick(newDate);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </li>
      ) : null}
    </>
  );
}
