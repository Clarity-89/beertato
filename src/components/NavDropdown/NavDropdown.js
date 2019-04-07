import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { List } from "../List";

/**
 *
 * NavDropdown
 *
 */
const NavDropdown = ({ title, links }) => {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <Fragment>
      <Container
        onMouseEnter={() => setShowLinks(true)}
        onMouseLeave={() => setShowLinks(false)}
      >
        <Title>{title}</Title>
        <Links visible={showLinks}>
          {links.map((link, i) => (
            <LinkWrapper key={i}>{link}</LinkWrapper>
          ))}
        </Links>
      </Container>
    </Fragment>
  );
};

NavDropdown.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array
};

const Container = styled.div`
  position: relative;
`;

const Links = styled(List)`
  display: none;
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;

  ${({ visible }) => visible && "display: block"}
`;
const LinkWrapper = styled.li`
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 8px;
  }
`;
const Title = styled.p`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default NavDropdown;
