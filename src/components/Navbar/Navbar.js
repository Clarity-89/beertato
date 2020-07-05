import React from "react";
import styled from "@emotion/styled";
import logo from "../../assets/img/logo.png";
import { Route, Link as RouterLink } from "react-router-dom";
import { FrontPage } from "../FrontPage";
import { NavDropdown } from "../NavDropdown";
import { Hops, HopDetail } from "../Hops";
import { Grains, GrainDetail } from "../Malt";
import { Yeast, YeastDetail } from "../Yeast";
import { Calculator } from "../Calculator";
import { Login, Signup } from "../Auth";

const routes = [
  {
    path: "/",
    component: FrontPage,
    exact: true,
  },
  {
    path: "/data/hops",
    component: Hops,
    exact: true,
  },
  { path: "/data/hops/:id", component: HopDetail },
  { path: "/data/grains", component: Grains, exact: true },
  { path: "/data/grains:id", component: GrainDetail },
  { path: "/data/yeast", component: Yeast, exact: true },
  { path: "/data/yeast:id", component: YeastDetail },
  { path: "/calculator", component: Calculator },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

/**
 *
 * Navbar
 *
 */
const navElements = ["Hops", "Grains", "Yeast", "Adjuncts"];

const links = navElements.map((element) => (
  <RouterLink key={element.toLowerCase()} to={`/data/${element.toLowerCase()}`}>
    {element}
  </RouterLink>
));

const Navbar = () => {
  return (
    <Main>
      <NavContainer>
        <Link to="/">
          <Logo src={logo} />
          Beertato
        </Link>
        <NavRight>
          <Link to="/calculator">Calculator</Link>
          <NavDropdown title="Database" links={links} />
        </NavRight>
      </NavContainer>
      <Container>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
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

const NavRight = styled.div`
  display: flex;
  ${Link} {
    margin-right: 10px;
  }
`;
export default Navbar;
