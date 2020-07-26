const knex = require("../connection");

module.exports = {
  Query: {
    origin: async (root, { id }) => {
      try {
        return await knex("countries").first().where("id", id);
      } catch (e) {
        console.error("Error fetching origin", e);
      }
    },
    origins: async (root, args) => {
      try {
        return await knex("countries").select();
      } catch (e) {
        console.error("Error fetching origins", e);
      }
    },
  },
};
