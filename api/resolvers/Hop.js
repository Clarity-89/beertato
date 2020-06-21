const knex = require("../connection");

module.exports = {
  Query: {
    hop: async (root, { id }) => {
      try {
        const hops = await knex("hops")
          .select()
          .where("id", id);
        return hops[0];
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
    }
  },
  Hop: {
    origin: async ({ origin }) => {
      try {
        const origins = await knex("countries")
          .select()
          .where("id", origin);
        return origins[0];
      } catch (e) {
        console.error("Error fetching origin for hop", e);
      }
    }
  }
};
