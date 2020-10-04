import React from "react";
import styled from "@emotion/styled";
import logo from "../../assets/img/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { NavDropdown } from "../NavDropdown";

const navElements = ["Hops", "Grains", "Yeast", "Adjuncts"];

const navLinks = navElements.map((element) => (
  <RouterLink key={element.toLowerCase()} to={`/data/${element.toLowerCase()}`}>
    {element}
  </RouterLink>
));

const Navbar = ({ links = [], extraNavLinks = [] }) => {
  return (
    <NavContainer>
      <Link to="/">
        <Logo src={logo} />
        Beertato
      </Link>
      <NavRight>
        <NavDropdown title="Database" links={[...navLinks, ...extraNavLinks]} />
        {links.map((link) => (
          <Link key={link.name} to={link.url}>
            {link.name}
          </Link>
        ))}
      </NavRight>
    </NavContainer>
  );
};

Navbar.propTypes = {};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #f7f9cd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Logo = styled.img`
  display: flex;
  align-items: center;
  height: 35px;
  width: 40px;
`;

const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
`;

const NavRight = styled.div`
  display: flex;
  ${Link} {
    margin-right: 10px;
  }
`;
export default Navbar;
