const { mergeTypes } = require("merge-graphql-schemas");

const Hop = require("./Hop");
const Origin = require("./Origin");
const Grain = require("./Grain");
const Yeast = require("./Yeast");
const Adjunct = require("./Adjunct");

const typeDefs = [Hop, Origin, Grain, Yeast, Adjunct];

module.exports = mergeTypes(typeDefs, { all: true });
