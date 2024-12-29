import { useContext } from "react";

import { CounterContext } from "@/routes/counter";

export function useCounter() {
  const { state, dispatch } = useContext(CounterContext);

  return { state, dispatch };
}
