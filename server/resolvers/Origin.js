const knex = require("../connection");

module.exports = {
  Query: {
    origin: async (root, { id }) => {
      try {
        const origins = await knex("countries")
          .select()
          .where("id", id);
        return origins[0];
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
    }
  }
};
