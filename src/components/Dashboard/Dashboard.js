import React from "react";
import styled from "@emotion/styled";
import { Route } from "react-router-dom";
import { Container } from "../../styled/Layout/Layout";
import { Inventory, Profile, RecipeList, Recipe, SideNav } from "./index";

const Dashboard = (props) => {
  const routes = [
    { path: `${props.match.url}/profile`, component: Profile },
    { path: `${props.match.url}/inventory`, component: Inventory },
    { path: `${props.match.url}/recipes`, component: RecipeList },
    { path: `${props.match.url}/recipes/:id`, component: Recipe },
  ];
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
  width: 100%;
`;
export default Dashboard;
