const { mergeResolvers } = require("merge-graphql-schemas");

const Origin = require("./Origin");
const User = require("./User");
const Inventory = require("./Inventory");
const Recipe = require("./Recipe");
const Item = require("./Item");
const BeerStyle = require("./BeerStyle");

const resolvers = [Origin, User, Inventory, Recipe, Item, BeerStyle];

module.exports = mergeResolvers(resolvers);
