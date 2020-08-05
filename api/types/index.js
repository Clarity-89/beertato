const path = require("path");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");

const typeDefs = loadSchemaSync(path.join(__dirname, "*.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

module.exports = typeDefs;
