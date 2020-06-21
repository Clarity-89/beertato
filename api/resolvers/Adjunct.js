const knex = require("../connection");

module.exports = {
  Query: {
    adjunct: async (root, { id }) => {
      try {
        const adjuncts = await knex("adjuncts")
          .select()
          .where("id", id);
        return adjuncts[0];
      } catch (e) {
        console.error("Error fetching adjunct", e);
      }
    },
    adjuncts: async (root, args) => {
      try {
        return await knex("countries").select();
      } catch (e) {
        console.error("Error fetching adjuncts", e);
      }
    }
  }
};
