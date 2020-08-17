const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { addResolversToSchema } = require("@graphql-tools/schema");
const { SchemaDirectiveVisitor } = require("@graphql-tools/utils");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const { AuthenticationDirective } = require("./directives/");
const { API_PORT, WEB_PORT } = require("../src/services/api/constants");
const { getUser } = require("./utils/getUser");
require("dotenv").config();

const app = express();
const apiPort = process.env.API_PORT || API_PORT;
const webPort = process.env.WEB_PORT || WEB_PORT;

const cors = {
  origin: `http://localhost:${webPort}`,
  credentials: true,
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

// GraphQL schema
const schema = addResolversToSchema({
  schema: typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context({ req }) {
    const user = getUser(req);
    return { user };
  },
});

SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
  authenticated: AuthenticationDirective,
});

server.applyMiddleware({ app, cors });

app.listen({ port: apiPort }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${apiPort}${server.graphqlPath}`
  )
);
