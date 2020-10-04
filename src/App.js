import React from "react";
import { useAuth } from "./context";
import AuthApp from "./AuthenticatedApp";
import UnAuthApp from "./UnAuthenticatedApp";

const App = () => {
  const { user } = useAuth();
  return user ? <AuthApp user={user} /> : <UnAuthApp />;
};

export default App;
