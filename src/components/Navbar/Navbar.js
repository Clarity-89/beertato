import React from "react";
import styled from "@emotion/styled";
import logo from "../../assets/img/logo.png";
import { Route, Link as RouterLink } from "react-router-dom";
import { FrontPage } from "../FrontPage";
import { NavDropdown } from "../NavDropdown";
import { Hops, HopDetail } from "../Hops";
import { Grains, GrainDetail } from "../Malt";
import { Yeast, YeastDetail } from "../Yeast";

/**
 *
 * Navbar
 *
 */
const Navbar = () => {
  const navElements = ["Hops", "Grains", "Yeast", "Adjuncts"];
  const links = navElements.map(element => (
    <RouterLink
      key={element.toLowerCase()}
      to={`/data/${element.toLowerCase()}`}
    >
      {element}
    </RouterLink>
  ));

  return (
    <Main>
      <NavContainer>
        <Link to="/">
          <Logo src={logo} />
          Beertato
        </Link>
        <NavDropdown title="Database" links={links} />
      </NavContainer>
      <Container>
        <Route path="/" exact component={FrontPage} />
        <Route exact path="/data/hops" component={Hops} />
        <Route path="/data/hops/:id" component={HopDetail} />
        <Route exact path="/data/grains" component={Grains} />
        <Route path="/data/grains/:id" component={GrainDetail} />
        <Route exact path="/data/yeast" component={Yeast} />
        <Route path="/data/yeast/:id" component={YeastDetail} />
      </Container>
    </Main>
  );
};

Navbar.propTypes = {};

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const NavContainer = styled.div`
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 24px 48px;
  max-width: 1200px;
`;
export default Navbar;
