import { HeadingOne } from "@/components/ui/typography";
import { TaskManagement } from "@/modules/tasks/task-management";
import { Toaster } from "@/components/ui/sonner";

export function HomeRoute() {
  return (
    <div className="space-y-4">
      <HeadingOne className="text-center">Momentum</HeadingOne>
      <p className="text-center p-2 pt-0">
        A simple task management app. Also, visit other pages on navigation bar
        to explore other react functionality and library demonstrations.
      </p>

      <TaskManagement />

      <Toaster richColors closeButton />
    </div>
  );
}
