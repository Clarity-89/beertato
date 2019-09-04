import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

/**
 *
 * Search
 *
 */
const Search = ({ getValue }) => {
  const [val, setVal] = useState("");

  const onChange = e => {
    const { value } = e.target;
    setVal(value);
    getValue(value);
  };

  return (
    <Input
      icon="search"
      iconPosition="left"
      placeholder="Search"
      value={val}
      onChange={onChange}
    />
  );
};

Search.propTypes = {
  getValue: PropTypes.func
};

export default Search;
