import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Dropdown } from "semantic-ui-react";

/**
 *
 * NavDropdown
 *
 */
const NavDropdown = ({ title, links }) => {
  return <StyledDropdown text={title} options={links} floating />;
};

NavDropdown.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array
};

const StyledDropdown = styled(Dropdown)`
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
  }
`;

export default NavDropdown;
