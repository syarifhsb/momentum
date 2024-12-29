import { createContext, useReducer } from "react";

import { CounterApp } from "@/modules/counter/counter-app";

type CounterState = {
  count: number;
};

type CounterAction = {
  type: string;
};

type CounterContextType = {
  state: CounterState;
  dispatch: React.Dispatch<CounterAction>;
};

export const CounterContext = createContext<CounterContextType>({
  state: { count: 0 },
  dispatch: () => {},
});

export const counterReducer = (state: any, action: any) => {
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
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <CounterApp />
    </CounterContext.Provider>
  );
}
