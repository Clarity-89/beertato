import React from "react";
import styled from "@emotion/styled";
import { Route } from "react-router-dom";
import { Container } from "../../styled/Layout/Layout";
import { Profile, SideNav } from "./index";

const Dashboard = (props) => {
  const routes = [{ path: `${props.match.url}/profile`, component: Profile }];
  return (
    <Page>
      <SideNav {...props} />
      <Wrapper>
        {routes.map((route) => (
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
            exact
          />
        ))}
      </Wrapper>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  width: 100%;
`;

const Wrapper = styled(Container)`
  padding: 0 40px;
`;
export default Dashboard;
