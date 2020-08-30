import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

/**
 *
 * FieldSet
 *
 */
const FieldSet = ({ label, children }) => {
  return (
    <Container>
      {label && <Legend>{label}</Legend>}
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

FieldSet.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

const Container = styled.fieldset`
  margin: 16px 0;
  padding: 25px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Legend = styled.legend`
  font-size: 16px;
`;

export default FieldSet;
