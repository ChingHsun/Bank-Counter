import { useEffect, useRef, useState } from "react";
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
      height: 100%;
      padding: 20px;
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
    { id: 1, name: "Amy" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Steven" },
    { id: 4, name: "Cara" },
  ];
  const count = useRef(0);
  const nextCounter = useRef();
  const nextWait = useRef();
  const freeCounters = useRef([]);

  useEffect(() => {
    console.log(freeCounters.current);

    if (waitList.length !== 0) {
      nextWait.current = waitList[0];
      if (freeCounters.current.length !== 0) {
        nextCounter.current = freeCounters.current[0];
        freeCounters.current = freeCounters.current.slice(1);
        setWaitList(waitList.slice(1));
      }
    }
  }, [waitList, nextCounter.current]);
  const isEmpty = (id) => {
    freeCounters.current = [...freeCounters.current, id];
  };

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
            <Counter
              key={id}
              counter={name}
              wait={nextCounter.current === id ? nextWait.current : null}
              isEmpty={() => isEmpty(id)}
            ></Counter>
          ))}
        </StyledCounter>
        <StyledInfo>
          <div>waiting:{waitList.length}</div>
          <div>
            <button
              onClick={() => {
                count.current++;
                setWaitList([...waitList, count.current]);
              }}
            >
              Next {waitList.length + 1}
            </button>
          </div>
        </StyledInfo>
      </StyledInner>
    </div>
  );
};

export default App;
