import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { getSyncedTasks, getTaskById, syncTasks } from "@/modules/tasks/task";
import { updateTaskData } from "@/modules/tasks/task";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { HeadingOne } from "@/components/ui/typography";

export function TaskIdRoute() {
  const params = useParams();
  const navigate = useNavigate();

  const task = getTaskById(Number(params.id));

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    task?.date
  );

  function handleSubmitTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!task) return;

    try {
      const formData = new FormData(event.currentTarget);
      formData.set("date", selectedDate?.toString() || "");

      const updatedTask = updateTaskData(task, formData);

      if (updatedTask) {
        const tasks = getSyncedTasks();
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        syncTasks(updatedTasks);
        navigate("/");
      } else {
        toast.error("Failed to update task", { description: "Invalid data" });
      }
    } catch (error: Error | any) {
      toast.error("Failed to update task", { description: error.message });
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <HeadingOne>Update task</HeadingOne>
        <p>Update existing task details</p>
      </header>

      {!task && <p>Task not found</p>}

      {task && (
        <form onSubmit={handleSubmitTask} className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              name="title"
              required
              id="title"
              placeholder="Eat some breakfast"
              defaultValue={task.title}
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
              defaultValue={task.description}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue
                  placeholder={"Category"}
                  defaultValue={task.category}
                />
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
              type="text"
              defaultValue={selectedDate?.toString()}
              // Only set once first, then being used when submitted
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
                  selected={selectedDate} // defaultValue
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Button className="w-full" type="submit">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
