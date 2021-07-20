import { memo, useEffect } from "react";

const Counter = ({ id, name, processing, processed, onProcessed }) => {
  useEffect(() => {
    onProcessed(id, processing);
  }, [processing]);
  return (
    <div className="grid">
      <div className="counter content">
        <p>{name}</p>
      </div>
      <div className="content">
        <p>{processing}</p>
      </div>
      <div className="content">
        <p>{processed.join()}</p>
      </div>
    </div>
  );
};

export default memo(Counter);
