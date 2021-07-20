import { memo, useEffect, useRef, useState } from "react";

const Counter = ({ id, name, processing, onBeFree }) => {
  const [processed, setProcessed] = useState([]);
  useEffect(() => {
    console.log(`id${id}:`, processed);
    if (processing !== "idle") {
      const min = Math.ceil(500);
      const max = Math.floor(1500);
      const time = Math.floor(Math.random() * (max - min + 1) + min);
      let timer = setTimeout(() => {
        setProcessed([...processed, processing]);
        onBeFree(id);
      }, [time]);
    }
  }, [id, processing]);
  return (
    <div className="flex">
      <p className="counter">{name}</p>
      <p>{processing}</p>
      <p>{processed.join()}</p>
    </div>
  );
};

export default memo(Counter);
