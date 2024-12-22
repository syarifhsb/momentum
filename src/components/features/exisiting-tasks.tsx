import { useTasks } from "@/features/task";
import { TaskCardItem } from "@/components/features/task-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ExistingTasks() {
  const tasks = useTasks();
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Existing Tasks</CardTitle>
          <CardDescription>
            {tasks.length === 0 ? (
              <>Good job. You have no tasks pending.</>
            ) : (
              <>You have {tasks.length} tasks pending.</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4">
            {tasks.map((task) => (
              <TaskCardItem key={task.id} task={task} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
