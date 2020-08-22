const knex = require("../connection");

module.exports = {
  Query: {
    yeast: async (parent, { id }) => {
      try {
        const yeasts = await knex("yeast")
          .select()
          .where("id", id);
        return yeasts[0];
      } catch (e) {
        console.error("Error retrieving yeast", e);
      }
    },
    yeasts: async () => {
      try {
        return await knex("yeast").select();
      } catch (e) {
        console.error("Error fetching yeasts", e);
      }
    }
  }
};
