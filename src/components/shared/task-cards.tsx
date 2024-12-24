import { Debug } from "@/components/ui/debug";
import { Task } from "@/modules/tasks/task";

export function TaskCards({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li>
          <Debug>{task}</Debug>
        </li>
      ))}
    </ul>
  );
}
