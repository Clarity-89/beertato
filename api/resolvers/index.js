const { mergeResolvers } = require("merge-graphql-schemas");

const Hop = require("./Hop");
const Origin = require("./Origin");
const Grain = require("./Grain");
const Yeast = require("./Yeast");
const Adjunct = require("./Adjunct");
const User = require("./User");
const Inventory = require("./Inventory");
const Recipe = require("./Recipe");
const Item = require("./Item");

const resolvers = [
  Hop,
  Origin,
  Grain,
  Yeast,
  Adjunct,
  User,
  Inventory,
  Recipe,
  Item,
];

module.exports = mergeResolvers(resolvers);
