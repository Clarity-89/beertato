import React from "react";
import styled from "@emotion/styled";
import { Navbar } from "./components/Navbar";
import { privateLinks, privateRoutes } from "./router";
import { Route } from "react-router-dom";

const AuthApp = () => {
  return (
    <Main>
      <Navbar links={privateLinks} />
      <Container>
        {privateRoutes.map((route) => (
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

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 24px 48px;
`;

export default AuthApp;
