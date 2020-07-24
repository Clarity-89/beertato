import React, { createContext, useContext, useMemo } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { LoaderScreen } from "./components/Loader";
import { ErrorMessage } from "./styled/Alerts";

const GET_PROFILE = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

export const AuthContext = createContext({});
AuthContext.displayName = "AuthContext";

export const AuthProvider = (props) => {
  const { data, loading, error, refetch } = useQuery(GET_PROFILE, {
    errorPolicy: "all",
  });

  const value = useMemo(() => ({ user: data?.me, refetch }), [data, refetch]);

  if (loading) {
    return <LoaderScreen />;
  }

  if (error && !error.message.includes("You are not authenticated")) {
    return <ErrorMessage />;
  }

  return <AuthContext.Provider value={value} {...props} />;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
