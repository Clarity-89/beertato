const knex = require("../connection");

module.exports = {
  Query: {
    beerStyle: async (_, { id }) => {
      return knex("beer_styles").select().where({ id });
    },
    beerStyles: async () => {
      return knex("beer_styles").select();
    },
  },
};
