import { memo, useEffect, useRef, useState } from "react";

const Counter = ({ id, name, processing, onBeFree }) => {
  const [processed, setProcessed] = useState([]);
  useEffect(() => {
    console.log(`id:${id}:`, processed);
    if (processing !== "idle") {
      let timer = setTimeout(() => {
        setProcessed([...processed, processing]);
        onBeFree(id);
      }, [3000]);
    }
  }, [id, processing, processed, onBeFree]);
  return (
    <div className="flex">
      <p className="counter">{name}</p>
      <p>{processing}</p>
      <p>{processed.join()}</p>
    </div>
  );
};

export default memo(Counter);
