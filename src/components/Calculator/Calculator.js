import React, { useState } from "react";
import styled from "@emotion/styled";
import { Input } from "semantic-ui-react";

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
    return (value * targets.current) / targets.original;
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
        />
      </div>
      <div>
        <Input
          label="Current target (L):"
          type="text"
          name="current"
          value={targets.current}
          onChange={updateTargets}
        />
      </div>
      <div>
        <Input
          label="Value to convert"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </div>
      <div>Result: {convert()}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Calculator;
