import { Button } from "@/components/ui/button";
import { useCounter } from "@/modules/counter/use-counter";

export function CounterPanel() {
  const { dispatch } = useCounter();

  return (
    <div className="flex gap-2">
      <Button onClick={() => dispatch({ type: "increment" })}>Increase</Button>
      <Button onClick={() => dispatch({ type: "decrement" })}>Decrease</Button>
      <Button
        variant={"destructive"}
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </Button>
    </div>
  );
}
