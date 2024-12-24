import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState({
    value: 0,
  });

  function handleIncrement() {
    setCount({
      value: count.value + 1,
    });
  }

  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
