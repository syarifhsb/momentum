import { Link } from "react-router";
import { format } from "date-fns";
import { CalendarIcon, X as IconX } from "lucide-react";
import { toast } from "sonner";

import { Task } from "@/modules/tasks/task";
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
import { formatDate } from "@/lib/datetime";
import {
  Select,
  SelectButtonTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function TaskCard({
  task,
  updateTaskState,
  deleteTaskState,
}: {
  task: Task;
  updateTaskState: (task: Task) => void;
  deleteTaskState: (taskId: number) => void;
}) {
  function handleChangeCategory(value: string) {
    task.category = value;

    updateTaskState(task);
  }

  function handleRemoveCategory() {
    // Question: Why does this work?
    return () => {
      task.category = "";

      updateTaskState(task);
    };

    // And this doesn't work?
    // task.category = "";
    // updateTaskState(task);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div>{task.description}</div>
      </CardContent>

      <CardFooter className="flex flex-row flex-wrap content-start gap-4">
        <div className="flex gap-1">
          <Select onValueChange={handleChangeCategory} value={task.category}>
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
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
            </SelectContent>
          </Select>

          {task.category && (
            <Button
              size="icon-xs"
              variant={"secondary"}
              onClick={handleRemoveCategory()}
              // onClick={handleRemoveCategory}
            >
              <IconX />
            </Button>
          )}
        </div>

        <TaskDatePicker task={task} updateTaskState={updateTaskState} />

        <Button asChild size={"xs"}>
          <Link to={`/tasks/${task.id}`}>Update</Link>
        </Button>

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
