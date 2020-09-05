import React from "react";

const NumberInput = ({ value, onChange, ...rest }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(parseFloat(value));
  };

  return (
    <input
      lang="en"
      type="number"
      step="any"
      onChange={handleChange}
      value={value || 0}
      {...rest}
    />
  );
};

export default NumberInput;
