import { useReducer } from "react";

import { Button } from "@/components/ui/button";
import { HeadingOne } from "@/components/ui/typography";
import { reducerCounter } from "@/routes/counter-route";

export function Counter() {
  const [state, dispatch] = useReducer(reducerCounter, { count: 0 });

  return (
    <div className="flex flex-col items-center space-y-4">
      <HeadingOne>Counter</HeadingOne>

      <p className="text-center p-2 pt-0">
        A simple counter app to demonstrate the use of useReducer hook.
      </p>

      <div className="flex gap-2">
        <Button onClick={() => dispatch({ type: "increment" })}>
          Increase
        </Button>
        <Button onClick={() => dispatch({ type: "decrement" })}>
          Decrease
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </Button>
      </div>

      <p className="text-center p-2 pt-0">count: {state.count}</p>
    </div>
  );
}
