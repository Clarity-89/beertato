import React from "react";
import { Button } from "semantic-ui-react";
import { Container } from "../../styled/Layout/Layout";
import { TOKEN_KEY } from "../../constants";
import { useAuth } from "../../context";

const Profile = (props) => {
  const { user, refetch } = useAuth();

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    refetch();
    props.history.push("/");
  };

  return (
    <Container>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <Button onClick={logout}>Log out</Button>
    </Container>
  );
};

export default Profile;
