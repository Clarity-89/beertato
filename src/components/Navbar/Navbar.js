import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import { Route, Link } from "react-router-dom";
import { FrontPage } from "../FrontPage";
import { NavDropdown } from "../NavDropdown";
import { Hops, HopDetail } from "../Hops";

/**
 *
 * Navbar
 *
 */
const Navbar = props => {
  const links = [
    <Link to="/data/hops">Hops</Link>,
    <Link to="/data/malts">Malts</Link>,
    <Link to="/data/yeast">Yeast</Link>,
    <Link to="/data/adjuncts">Adjuncts</Link>
  ];
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
  padding: 16px;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Logo = styled.img`
  height: 35px;
  width: 40px;
`;

export default Navbar;
