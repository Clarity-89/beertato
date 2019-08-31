import React, { Fragment } from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import { Route, Link as RouterLink } from "react-router-dom";
import { FrontPage } from "../FrontPage";
import { NavDropdown } from "../NavDropdown";
import { Hops, HopDetail } from "../Hops";

/**
 *
 * Navbar
 *
 */
const Navbar = () => {
  const navElements = ["Hops", "Malt", "Yeast", "Adjuncts"];
  const links = navElements.map(element => (
    <RouterLink
      key={element.toLowerCase()}
      to={`/data/${element.toLowerCase()}`}
    >
      {element}
    </RouterLink>
  ));

  return (
    <Fragment>
      <Container>
        <Link to="/">
          <Logo src={logo} />
          Beertato
        </Link>
        <NavDropdown title="Database" links={links} />
      </Container>
      <Route path="/" exact component={FrontPage} />
      <Route exact path="/data/hops" component={Hops} />
      <Route path="/data/hops/:id" component={HopDetail} />
    </Fragment>
  );
};

Navbar.propTypes = {};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: transparent;
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

export default Navbar;
