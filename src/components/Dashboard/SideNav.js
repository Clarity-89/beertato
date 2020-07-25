import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { useAuth } from "../../context";
import { auth } from "../../services/auth/auth";

const SideNav = ({ history, match }) => {
  const { refetch } = useAuth();
  const links = [
    { name: "Profile", url: `${match.url}/profile` },
    { name: "Inventory", url: `${match.url}/inventory` },
    { name: "Recipes", url: `${match.url}/recipes` },
  ];

  const logout = () => {
    auth.logout(() => {
      refetch();
      history.push("/");
    });
  };

  return (
    <Container>
      <Menu vertical>
        {links.map((link) => (
          <Menu.Item
            key={link.name}
            active={window.location.pathname === link.url}
          >
            <NavLink to={link.url}>{link.name}</NavLink>
          </Menu.Item>
        ))}
        <Menu.Item>
          <Button onClick={logout}>Log out</Button>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

const NavLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: block;
  :hover {
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

export default SideNav;
