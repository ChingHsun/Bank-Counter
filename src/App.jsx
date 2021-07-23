import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Counter from "./components/Counter";
import { counterList } from "./utils";

const StyledInner = styled.div`
  max-width: 1200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;
const StyledCounter = styled.div`
  width: 100%;
  margin-bottom: 5%;
  @media screen and (max-width: 768px) {
    overflow: scroll;
  }
  .grid {
    display: grid;
    word-wrap: break-word;
    word-break: break-all;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    min-height: 70px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff7d6b;
      font-size: 1.2rem;
      color: white;
      font-weight: 900;
    }
  }
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-end;
    min-height: 130px;
  }

  .wait {
    font-size: 1.5rem;
    span {
      display: inline-block;
      text-align: center;
      line-height: 50px;
      margin-left: 20px;
      background: ${(props) => (props.wait ? "#2b3344" : "#c8c9ce")};
      border-radius: 100%;
      width: 50px;
      height: 50px;
      color: white;
    }
  }
  button {
    background: white;
    border: 2px solid #ff7d6b;
    color: #ff7d6b;
    font-size: 2rem;
    padding: 10px 30px;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background: #ff7d6b;
      color: white;
    }
  }
`;

const App = () => {
  const [waitList, setWaitList] = useState([]);
  const [processData, setProcessData] = useState({
    processing: counterList.map((i) => "idle"),
    processed: counterList.map((i) => []),
  });
  const count = useRef(0);
  useEffect(() => {
    if (waitList.length > 0) {
      const freeIndex = processData.processing.findIndex((e) => e === "idle");
      if (freeIndex !== -1) {
        let [next, ...rest] = waitList;
        setProcessData({
          ...processData,
          processing: [
            ...processData.processing.slice(0, freeIndex),
            next,
            ...processData.processing.slice(freeIndex + 1),
          ],
        });
        setWaitList(rest);
      }
    }
  }, [waitList, processData.processing]);

  const handleProcessed = async (id, value) => {
    const min = 500;
    const max = 1500;
    const time = Math.floor(Math.random() * (max - min + 1) + min);
    if (processData.processing[id] !== "idle") {
      await new Promise((resolve) =>
        setTimeout(() => {
          setProcessData((pre) => {
            return {
              ...pre,
              processed: [
                ...pre.processed.slice(0, id),
                [...pre.processed[id], value],
                ...pre.processed.slice(id + 1),
              ],
            };
          });
          resolve("");
        }, time)
      );
      setProcessData((pre) => {
        return {
          ...pre,
          processing: [
            ...pre.processing.slice(0, id),
            "idle",
            ...pre.processing.slice(id + 1),
          ],
        };
      });
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
      }}
    >
      <StyledInner>
        <div>
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
            {counterList.map((name, idex) => (
              <Counter
                key={idex}
                id={idex}
                name={name}
                processing={processData.processing[idex]}
                onProcessed={handleProcessed}
                processed={processData.processed[idex]}
              ></Counter>
            ))}
          </StyledCounter>
          <StyledInfo wait={waitList.length}>
            <div className="wait">
              Waiting<span>{waitList.length}</span>
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
        </div>
      </StyledInner>
    </div>
  );
};

export default App;
