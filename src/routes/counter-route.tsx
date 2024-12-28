import { createContext } from "react";

import { Counter } from "@/modules/counter/counter";

export const reducerCounter = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
};

export function CounterRoute() {
  const CounterContext = createContext(reducerCounter);

  return (
    <CounterContext.Provider value={reducerCounter}>
      <Counter />
    </CounterContext.Provider>
  );
}
