import { useEffect, useRef, useState } from "react";

const Counter = ({ counter, wait, isEmpty }) => {
  const processing = useRef("idle");
  useEffect(() => {
    console.log("r", wait);
    if (processing.current === "idle") {
      isEmpty();
    }
    if (wait) {
      processing.current = wait;
    }
  }, [processing.current, wait]);

  return (
    <div className="flex">
      <p className="counter">{counter}</p>
      <p>{processing.current}</p>
      <p>processed</p>
    </div>
  );
};

export default Counter;
