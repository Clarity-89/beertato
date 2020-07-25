import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
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
      <NavLinks>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.url}>{link.name}</Link>
          </li>
        ))}
      </NavLinks>
      <Button onClick={logout}>Log out</Button>
    </Container>
  );
};

const NavLinks = styled.ul`
  list-style: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

export default SideNav;
