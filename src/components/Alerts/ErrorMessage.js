import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Message } from "semantic-ui-react";

const ErrorMessage = ({ header, text }) => (
  <Container>
    <Message negative size="big">
      <Message.Header>{header || "Oops, something went wrong"}</Message.Header>
      <p>{text || "Please try again later"}</p>
    </Message>
  </Container>
);

ErrorMessage.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
`;
export default ErrorMessage;
