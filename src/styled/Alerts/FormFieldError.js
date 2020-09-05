import styled from "@emotion/styled";
import { alert } from "../colors";
import React from "react";

const FormFieldError = ({ children }) => {
  return <ErrorWrapper role="alert">{children}</ErrorWrapper>;
};

const ErrorWrapper = styled.span`
  color: ${alert};
  font-size: 12px;
`;
export default FormFieldError;
