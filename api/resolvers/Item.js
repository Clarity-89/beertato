const knex = require("../connection");

module.exports = {
  Query: {
    item: async (_, { id }) => {
      try {
        const item = await knex("items").first().where({ id });
        return { ...item, data: JSON.stringify(item.data) };
      } catch (e) {
        console.error("Error retrieving item", e);
      }
    },
    items: async (_, { type }) => {
      try {
        if (type) {
          const items = await knex("items").select().where({ type });
          return items.map((item) => ({
            ...item,
            data: JSON.stringify(item.data),
          }));
        }
        return knex("items").select();
      } catch (e) {
        console.error("Error fetching hops", e);
      }
    },
  },
  Item: {
    origin: async ({ origin }) => {
      try {
        return knex("countries").first().where("id", origin);
      } catch (e) {
        console.error("Error fetching origin", e);
      }
    },
  },
};
