import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container } from "../../styled/Layout/Layout";

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
  return (
    <Container>
      <h2>Profile</h2>
      <p>Email: {data?.me?.email}</p>
      <p>Username: {data?.me?.username}</p>
    </Container>
  );
};

export default Profile;
