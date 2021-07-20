import { memo, useEffect } from "react";
import styled from "styled-components";

const StyledCounter = styled.div`
  .content {
    min-height: 100px;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid #2b3344;

    p {
      line-height: 40px;
      padding: 10px;
    }
  }
  .item {
    display: inline-block;
    background: #2b3344;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    margin-right: 5px;
    margin: 5px 5px 5px 0px;
    color: white;
  }
  .processing {
    background: ${(props) => (props.content === "idle" ? "none" : "#2b3344")};
    border-radius: 100%;
    width: ${(props) => (props.content === "idle" ? "none" : "40px")};
    height: ${(props) => (props.content === "idle" ? "none" : "40px")};
    color: ${(props) => (props.content === "idle" ? "black" : "white")};
    padding: ${(props) => (props.content === "idle" ? "10px" : "0px")};
  }
`;
const Counter = ({ id, name, processing, processed, onProcessed }) => {
  useEffect(() => {
    onProcessed(id, processing);
  }, [processing]);
  return (
    <StyledCounter content={processing}>
      <div className="grid">
        <div className="counter content">
          <p>{name}</p>
        </div>
        <div className="content">
          <p className="processing">{processing}</p>
        </div>
        <div className="content">
          <p className="processed">
            {processed.map((item, index) => (
              <span className="item" key={index}>
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>
    </StyledCounter>
  );
};

export default memo(Counter);
