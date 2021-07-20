import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Counter from "./components/Counter";

const StyledInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const StyledCounter = styled.div`
  width: 100%;
  .flex {
    display: flex;
    justify-content: space-between;
    .counter {
      flex-basis: 20%;
    }
    p {
      text-align: center;
      flex-basis: 40%;
      outline: 1px solid black;
      height: 40px;
      line-height: 40px;
    }
  }
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const App = () => {
  const [waitList, setWaitList] = useState([]);
  const counterList = [
    { id: 0, name: "Amy" },
    { id: 1, name: "Bob" },
    { id: 2, name: "Steven" },
    { id: 3, name: "Cara" },
  ];
  const [processing, setProcessing] = useState([
    "idle",
    "idle",
    "idle",
    "idle",
  ]);
  //const count = useRef(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("count", count);
    if (count > 0) {
      const freeIndex = processing.findIndex((e) => e === "idle");
      console.log("freeIndex", freeIndex);

      if (freeIndex !== -1) {
        if (waitList.length === 0) {
          console.log([
            ...processing.slice(0, freeIndex),
            count,
            ...processing.slice(freeIndex + 1),
          ]);
          setProcessing([
            ...processing.slice(0, freeIndex),
            count,
            ...processing.slice(freeIndex + 1),
          ]);
        } else {
          let [next, ...rest] = waitList;
          setProcessing([
            ...processing.slice(0, freeIndex),
            next,
            ...processing.slice(freeIndex + 1),
          ]);
          setWaitList(rest);
        }
      } else {
        setWaitList([...waitList, count]);
      }
    }
  }, [count]);

  const handleBeFree = useCallback((freeIndex) => {
    console.log("processing", processing);
    setProcessing([
      ...processing.slice(0, freeIndex),
      "idle",
      ...processing.slice(freeIndex + 1),
    ]);
  }, []);
  return (
    <div style={{ padding: "100px 30px" }}>
      <StyledInner>
        <StyledCounter>
          <div className="flex">
            <p className="counter">counter</p>
            <p>processing</p>
            <p>processed</p>
          </div>
          {counterList.map(({ id, name }) => (
            // <div className="flex" key={id}>
            //   <p className="counter">{name}</p>
            //   <p>{processing[id]}</p>
            //   <p>{processed[id]}</p>
            // </div>
            <Counter
              key={id}
              id={id}
              name={name}
              processing={processing[id]}
              onBeFree={handleBeFree}
            ></Counter>
          ))}
        </StyledCounter>
        <StyledInfo>
          <div>waiting:{waitList.length}</div>
          <div>
            <button
              onClick={() => {
                setCount((pre) => {
                  return pre + 1;
                });
              }}
            >
              Next {count + 1}
            </button>
          </div>
        </StyledInfo>
      </StyledInner>
    </div>
  );
};

export default App;
