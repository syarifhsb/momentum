import { Task } from "@/features/task";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function TaskCardItem({ task }: { task: Task }) {
  return (
    <li>
      <Card className="w-[250px]">
        <CardContent className="p-3">
          <CardTitle className="text-xl">{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardContent>
      </Card>
    </li>
  );
}
