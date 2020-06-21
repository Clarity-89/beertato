const restify = require("restify");
const expressGraphQL = require("express-graphql");
const corsMiddleware = require("restify-cors-middleware");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./types/");
const resolvers = require("./resolvers/");

// GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Create an express server and a GraphQL endpoint
const app = restify.createServer();
const cors = corsMiddleware({ origins: ["http://localhost:3000"] });

const port = 3005;
app.pre(cors.preflight);
app.use(cors.actual);

app.get(
  "/api",
  expressGraphQL({
    schema,
    graphiql: true
  })
);
app.post(
  "/api",
  expressGraphQL({
    schema,
    graphiql: false
  })
);
app.listen(port, () =>
  console.log(`Express GraphQL Server Now Running On localhost:${port}/api`)
);
