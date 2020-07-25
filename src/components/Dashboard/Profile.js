import React from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../context";

/**
 *
 * Profile
 *
 */
const Profile = (props) => {
  const { user } = useAuth();
  return (
    <Container>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
    </Container>
  );
};

const Container = styled.div``;

export default Profile;
