const knex = require("../connection");

module.exports = {
  Query: {
    hop: async (root, { id }) => {
      try {
        return await knex("hops").first().where("id", id);
      } catch (e) {
        console.error("Error retrieving hop", e);
      }
    },
    hops: async () => {
      try {
        return await knex("hops").select();
      } catch (e) {
        console.error("Error fetching hops", e);
      }
    },
  },
  Hop: {
    origin: async ({ origin }) => {
      try {
        return await knex("countries").first().where("id", origin);
      } catch (e) {
        console.error("Error fetching origin for hop", e);
      }
    },
  },
};
