import { HeadingOne } from "@/components/ui/typography";
import { CounterDisplay } from "@/modules/counter/counter-display";
import { CounterPanel } from "@/modules/counter/counter-panel";

export function CounterApp() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <HeadingOne>Counter</HeadingOne>

      <p className="text-center p-2 pt-0">
        A simple counter app to demonstrate the use of useReducer hook.
      </p>

      <CounterPanel />
      <CounterDisplay />
    </div>
  );
}
