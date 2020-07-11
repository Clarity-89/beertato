const restify = require("restify");
const expressGraphQL = require("express-graphql");
const corsMiddleware = require("restify-cors-middleware");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const { API_PORT, WEB_PORT } = require("../src/constants");
const jwt = require("express-jwt");
require("dotenv").config();

// GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["RS256"],
});

const apiPort = process.env.API_PORT || API_PORT;
const webPort = process.env.WEB_PORT || WEB_PORT;

// Create an express api and a GraphQL endpoint
const app = restify.createServer();

const cors = corsMiddleware({
  origins: [`http://localhost:${webPort}`],
});

app.pre(cors.preflight);
app.use(cors.actual);
app.use(auth);

app.get(
  "/api",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.post(
  "/api",
  expressGraphQL({
    schema,
    graphiql: false,
  })
);

app.listen(apiPort, () =>
  console.log(`Express GraphQL Server Now Running On localhost:${apiPort}/api`)
);
