const knex = require("../connection");
const { Item } = require("./Item");
const { getItemById, deleteItem } = require("./utils");

module.exports = {
  Query: {
    inventory: async (_, { type }, { user }) => {
      try {
        if (type) {
          return knex
            .select(
              "inventory.id",
              "inventory.amount",
              "inventory.user",
              "inventory.item"
            )
            .from("inventory")
            .innerJoin("items", "items.id", "=", "inventory.item")
            .where({ type });
        }
        return knex("inventory").select().where("user", user.id);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Inventory: {
    item: async ({ item }) => getItemById(item, "items"),
  },
  Item,
  Mutation: {
    addInventory: async (_, { amount, item_id }, { user }) => {
      const getItem = knex("inventory")
        .where({ item: item_id, user: user.id })
        .first();

      if (await getItem) {
        const res = await getItem
          .update({ amount })
          .returning(["id", "item", "amount", "user"]);
        return res[0];
      }

      try {
        const inventory = await knex("inventory")
          .insert({
            user: user.id,
            amount,
            item: item_id,
          })
          .returning(["id", "item", "amount", "user"]);
        return inventory[0];
      } catch (e) {
        throw new Error(e);
      }
    },
    updateInventory: async (_, { amount, id }, { user }) => {
      try {
        const res = await knex("inventory")
          .where({ id, user: user.id })
          .update({ amount })
          .returning(["id", "item", "amount", "user"]);
        return res[0];
      } catch (e) {
        throw new Error(e);
      }
    },
    deleteInventory: async (_, { id }, { user }) => {
      return deleteItem(id, user.id, "inventory");
    },
  },
};
