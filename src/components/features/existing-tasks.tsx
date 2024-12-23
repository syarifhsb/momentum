import * as React from "react";
import { TaskCardItem } from "@/components/features/task-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/features/task";

export function ExistingTasks({
  tasks,
  noOfTasks,
  setNoOfTasks,
}: {
  tasks: Task[];
  noOfTasks: number;
  setNoOfTasks: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Existing Tasks</CardTitle>
          <CardDescription>
            {noOfTasks === 0 ? (
              <>Good job. You have no tasks pending.</>
            ) : (
              <>You have {noOfTasks} tasks pending.</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4">
            {tasks.map((task) => (
              <TaskCardItem
                key={task.id}
                task={task}
                setNoOfTasks={setNoOfTasks}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
