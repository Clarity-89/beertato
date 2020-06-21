import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { API_PORT } from "../../constants";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://localhost:${API_PORT}/api`
});

export const client = new ApolloClient({
  cache,
  link
});
