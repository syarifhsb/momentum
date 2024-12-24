import { format } from "date-fns";
import { CalendarIcon, X as IconX } from "lucide-react";

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
import { toast } from "sonner";
import { formatDate } from "@/lib/datetime";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TaskCard({
  task,
  updateTask,
}: {
  task: Task;
  updateTask: (task: Task) => void;
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
            <SelectTrigger
              size={"xs"}
              variant={"secondary"}
              className={cn(
                "w-[100px] border-none",
                !task.category && "text-muted-foreground"
              )}
            >
              <SelectValue placeholder={task.category || "Category"} />
            </SelectTrigger>
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

        <TaskDatePicker task={task} updateTask={updateTask} />
      </CardFooter>
    </Card>
  );
}

export function TaskDatePicker({
  task,
  updateTask,
}: {
  task: Task;
  updateTask: (task: Task) => void;
}) {
  function handleSelectDate(selectedDate: Date | undefined) {
    updateTask({ ...task, date: selectedDate });

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
