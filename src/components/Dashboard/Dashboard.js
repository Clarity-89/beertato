import React from "react";
import styled from "@emotion/styled";
import { Route, Switch } from "react-router-dom";
import { Container } from "../../styled/Layout/Layout";
import {
  Inventory,
  Profile,
  Recipes,
  RecipeEdit,
  RecipeDetail,
  SideNav,
  NewRecipe,
} from "./index";

const Dashboard = (props) => {
  const routes = [
    { path: `${props.match.url}/profile`, component: Profile },
    { path: `${props.match.url}/inventory`, component: Inventory },
    { path: `${props.match.url}/recipes`, component: Recipes },
    { path: `${props.match.url}/recipes/new`, component: NewRecipe },
    { path: `${props.match.url}/recipes/:id`, component: RecipeDetail },
    { path: `${props.match.url}/recipes/:id/edit`, component: RecipeEdit },
  ];
  return (
    <Page>
      <SideNav {...props} />
      <Wrapper>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              component={route.component}
              path={route.path}
              exact
            />
          ))}
        </Switch>
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
