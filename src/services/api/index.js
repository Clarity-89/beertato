import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { API_PORT } from "./constants";
import { TOKEN_KEY } from "../../constants";

const logoutLink = onError(({ networkError }) => {
  if (networkError?.statusCode === 401) {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
  }
});

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://localhost:${API_PORT}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache,
  link: logoutLink.concat(authLink.concat(link)),
});
