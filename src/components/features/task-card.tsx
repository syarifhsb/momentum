import { saveTasks, Task, useTasks } from "@/features/task";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, GroupIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

const categories = ["Personal", "Work", "Shopping", "Others"];

export function TaskCardItem({ task }: { task: Task }) {
  const tasks = useTasks();

  function handleChangeCategory(category: string) {
    return () => {
      task.category = category;
      saveTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      //   Question: How to update the task category on UI without reloading the page?
      window.location.href = `/`;
    };
  }

  function handleDelete(task: Task) {
    return () => {
      saveTasks(tasks.filter((t) => t.id !== task.id));
      window.location.href = `/`;
    };
  }

  return (
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
                  <span>
                    <PencilIcon className="h-3 w-3" />
                  </span>
                  <p className="text-sm">Modify</p>
                  <DropdownMenuShortcut>m</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex flex-row gap-2 p-0.5 items-center rounded-sm hover:bg-primary focus:bg-primary outline-none"
                  onSelect={handleDelete(task)}
                >
                  <span>
                    <TrashIcon className="h-3 w-3" />
                  </span>
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
                  className="h-6 data-[state=open]:bg-accent p-0.5 border"
                  variant="ghost"
                  size="sm"
                >
                  <GroupIcon />
                  <p className="text-xs">{task.category || "No Category"}</p>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-20 bg-popover text-popover-foreground rounded-sm shadow-lg cursor-pointer p-1 border">
                {categories.map((category) => (
                  <DropdownMenuItem
                    onSelect={handleChangeCategory(category)}
                    className="text-xs"
                    key={category}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
