import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import bg from "../../assets/img/blend.svg";

/**
 *
 * FrontPage
 *
 */
const FrontPage = props => {
  return <Container>FP</Container>;
};

FrontPage.propTypes = {};

const Container = styled.div`
  background-image: url('${bg}');
  height: calc(100vh + 18px);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: -100px;
`;

export default FrontPage;
