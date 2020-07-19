import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button } from "semantic-ui-react";
import { Container } from "../../styled/Layout/Layout";
import { TOKEN_KEY } from "../../constants";

const PROFILE = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

const Profile = () => {
  const { data = {} } = useQuery(PROFILE);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
  };

  return (
    <Container>
      <h2>Profile</h2>
      <p>Email: {data?.me?.email}</p>
      <p>Username: {data?.me?.username}</p>
      <Button onClick={logout}>Log out</Button>
    </Container>
  );
};

export default Profile;
