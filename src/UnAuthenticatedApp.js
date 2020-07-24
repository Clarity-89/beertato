import React from "react";
import styled from "@emotion/styled";
import { Navbar } from "./components/Navbar";
import { publicLinks, publicRoutes } from "./router";
import { Route } from "react-router-dom";

const UnAuthApp = () => {
  return (
    <Main>
      <Navbar links={publicLinks} />
      <Container>
        {publicRoutes.map((route) => (
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
  max-width: 1200px;
`;

export default UnAuthApp;
