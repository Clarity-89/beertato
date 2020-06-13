import React, { useState } from "react";
import styled from "@emotion/styled";
import { Input } from "semantic-ui-react";
import { css } from "@emotion/core";

const labelStyle = css`
  .label {
    width: 150px;
  }
`;

/**
 *
 * Calculator
 *
 */
const Calculator = () => {
  const [targets, setTargets] = useState({ original: 27, current: 17 });
  const [value, setValue] = useState("");

  const updateTargets = e => {
    const { name, value } = e.target;
    setTargets({ ...targets, [name]: value });
  };

  const convert = () => {
    return ((value * targets.current) / targets.original).toFixed(2);
  };

  return (
    <Container>
      <h1>Calculator</h1>
      <div>
        <Input
          label="Original target (L):"
          type="text"
          name="original"
          value={targets.original}
          onChange={updateTargets}
          css={labelStyle}
        />
      </div>
      <div>
        <Input
          label="Current target (L):"
          type="text"
          name="current"
          value={targets.current}
          onChange={updateTargets}
          css={labelStyle}
        />
      </div>
      <div>
        <Input
          label="Value to convert"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          css={labelStyle}
        />
      </div>
      <Result>Result: {convert()}</Result>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Result = styled.div`
  margin-top: 6px;
  font-weight: bold;
`;

export default Calculator;
