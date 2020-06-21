const knex = require("../connection");

module.exports = {
  Query: {
    grain: async (parent, { id }) => {
      try {
        const grains = await knex("grains")
          .select()
          .where("id", id);
        return grains[0];
      } catch (e) {
        console.error("Error retrieving grain", e);
      }
    },
    grains: async () => {
      try {
        return await knex("grains").select();
      } catch (e) {
        console.error("Error fetching grains", e);
      }
    }
  },
  Grain: {
    origin: async ({ origin }) => {
      try {
        const origins = await knex("countries")
          .select()
          .where("id", origin);
        return origins[0];
      } catch (e) {
        console.error("Error fetching origin for grain", e);
      }
    }
  }
};
