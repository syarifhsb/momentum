import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div>{task.description}</div>
      </CardContent>

      <CardFooter className="flex gap-4">
        <Button size="xs" variant={"secondary"}>
          Category
        </Button>
        <TaskDatePicker date={task.date} />
      </CardFooter>
    </Card>
  );
}

export function TaskDatePicker({ date }: { date: Date | undefined }) {
  function handleSelectData(selectedDate: Date | undefined) {
    toast.success("Selected date", {
      description: formatDate(selectedDate),
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="xs"
          variant={"secondary"}
          className={cn(
            "w-[180px] pl-3 text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectData}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
