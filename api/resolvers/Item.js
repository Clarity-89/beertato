const knex = require("../connection");
const { getItemById } = require("./utils");

module.exports = {
  Query: {
    item: async (_, { id }) => {
      return getItemById(id, "items");
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
    substitutes: async ({ id }) => {
      try {
        return knex
          .select(
            "items.id",
            "items.name",
            "items.type",
            "items.description",
            "items.origin",
            "items.data"
          )
          .from("items")
          .innerJoin("substitutes", "items.id", "substitutes.substitute")
          .where("item", id);
      } catch (e) {
        console.error(e);
      }
    },
  },
  Mutation: {
    addItem: async (_, { input }) => {
      const item = await knex("items").insert(input).returning("*");
      return item[0];
    },
    updateItem: async (_, { id, input }) => {
      const item = await knex("items")
        .where({ id })
        .update(input)
        .returning("*");
      return item[0];
    },
  },
};
