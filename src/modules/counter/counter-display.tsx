import { Card } from "@/components/ui/card";
import { useCounter } from "@/modules/counter/use-counter";

export function CounterDisplay() {
  const { state } = useCounter();

  return (
    <Card>
      <p className="text-center p-2 pt-0">count: {state.count}</p>
    </Card>
  );
}
