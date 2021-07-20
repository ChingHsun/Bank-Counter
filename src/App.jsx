import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Counter from "./components/Counter";
import { counterList } from "./utils";

const StyledInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const StyledCounter = styled.div`
  width: 100%;
  margin-bottom: 5%;

  .grid {
    display: grid;
    //justify-content: space-between;
    word-wrap: break-word;
    word-break: break-all;
    grid-template-columns: 20% 40% 40%;
    text-align: center;
    min-height: 70px;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff7d6b;
      font-size: 1.5rem;
      color: white;
      font-weight: 900;
    }
    .content {
      min-height: 100px;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 0.5px solid white;

      p {
        line-height: 40px;
      }
    }
  }
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  .wait {
    font-size: 1.5rem;
    span {
      margin-left: 20px;
      font-size: 2rem;
    }
  }
  button {
    background: #ff7d6b;
    color: white;
    border: none;
    font-size: 2rem;
    padding: 10px 30px;
  }
`;

const App = () => {
  const [waitList, setWaitList] = useState([]);
  const [processing, setProcessing] = useState(counterList.map((i) => "idle"));
  const count = useRef(0);
  const [processed, setProcessed] = useState(counterList.map((i) => []));
  useEffect(() => {
    console.log(waitList);
    if (waitList.length > 0) {
      const freeIndex = processing.findIndex((e) => e === "idle");
      console.log("freeIndex", freeIndex);

      if (freeIndex !== -1) {
        console.log(waitList);
        console.log("in", count);

        let [next, ...rest] = waitList;
        setProcessing([
          ...processing.slice(0, freeIndex),
          next,
          ...processing.slice(freeIndex + 1),
        ]);
        setWaitList(rest);
      }
    }
  }, [waitList, processing]);

  const handleProcessed = async (id, value) => {
    console.log(id, value);
    const min = 500;
    const max = 1500;
    const time = Math.floor(Math.random() * (max - min + 1) + min);
    console.log("time");

    if (processing[id] !== "idle") {
      await new Promise((resolve) =>
        setTimeout(() => {
          setProcessed((pre) => [
            ...pre.slice(0, id),
            [...pre[id], value],
            ...pre.slice(id + 1),
          ]);
          resolve("");
        }, time)
      );
      setProcessing((pre) => [
        ...pre.slice(0, id),
        "idle",
        ...pre.slice(id + 1),
      ]);
    }
  };
  return (
    <div style={{ padding: "100px 30px" }}>
      <StyledInner>
        <StyledCounter>
          <div className="grid">
            <div className="counter title">
              <p>COUNTER</p>
            </div>
            <div className="title">
              <p>PROCESSING</p>
            </div>
            <div className="title">
              <p>PROCESSED</p>
            </div>
          </div>
          {counterList.map(({ id, name }) => (
            <Counter
              key={id}
              id={id}
              name={name}
              processing={processing[id]}
              onProcessed={handleProcessed}
              processed={processed[id]}
            ></Counter>
          ))}
        </StyledCounter>
        <StyledInfo>
          <div className="wait">
            Waiting:<span>{waitList.length}</span>
          </div>
          <div>
            <button
              onClick={() => {
                count.current++;
                setWaitList([...waitList, count.current]);
              }}
            >
              Next {count.current + 1}
            </button>
          </div>
        </StyledInfo>
      </StyledInner>
    </div>
  );
};

export default App;
