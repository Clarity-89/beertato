const express = require("express");
const jwt = require("express-jwt");
const { ApolloServer } = require("apollo-server-express");
const { addResolversToSchema } = require("@graphql-tools/schema");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const { API_PORT, WEB_PORT } = require("../src/services/api/constants");
require("dotenv").config();

const app = express();
const apiPort = process.env.API_PORT || API_PORT;
const webPort = process.env.WEB_PORT || WEB_PORT;

// Middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"],
});

const cors = {
  origin: `http://localhost:${webPort}`,
  credentials: true,
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

app.use(auth);

// GraphQL schema
const schema = addResolversToSchema({
  schema: typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context({ req }) {
    return { user: req.user };
  },
});

server.applyMiddleware({ app, cors });

app.listen({ port: apiPort }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${apiPort}${server.graphqlPath}`
  )
);
