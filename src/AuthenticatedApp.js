import React from "react";
import styled from "@emotion/styled";
import { Navbar } from "./components/Navbar";
import { privateLinks, privateRoutes } from "./router";
import { Route, Link } from "react-router-dom";
import { ItemForm } from "./components/Admin";

const AuthApp = ({ user }) => {
  const extraNavLinks = user?.isAdmin
    ? [
        <Link key="add-item" to="/items/add">
          Add item
        </Link>,
      ]
    : [];

  return (
    <Main>
      <Navbar links={privateLinks} extraNavLinks={extraNavLinks} />
      <Container>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}

        {user?.isAdmin && (
          <Route key="add" path="/items/add" component={ItemForm} />
        )}
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
