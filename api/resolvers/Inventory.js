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
              "inventories.id",
              "inventories.amount",
              "inventories.user",
              "inventories.item"
            )
            .from("inventories")
            .innerJoin("items", "items.id", "=", "inventories.item")
            .where({ type });
        }
        return knex("inventories").select().where("user", user.id);
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
      const getItem = knex("inventories")
        .where({ item: item_id, user: user.id })
        .first();

      if (await getItem) {
        const res = await getItem
          .update({ amount })
          .returning(["id", "item", "amount", "user"]);
        return res[0];
      }

      try {
        const inventory = await knex("inventories")
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
        const res = await knex("inventories")
          .where({ id, user: user.id })
          .update({ amount })
          .returning(["id", "item", "amount", "user"]);
        return res[0];
      } catch (e) {
        throw new Error(e);
      }
    },
    deleteInventory: async (_, { id }, { user }) => {
      return deleteItem(id, user.id, "inventories");
    },
    updateInventoryItems: async (_, { input }, { user }) => {
      return knex.transaction(async (trx) => {
        const promises = input.map((item) => {
          return trx("inventories")
            .where({ id: item.item_id, user: user.id })
            .update({ amount: item.amount })
            .returning("*");
        });

        return Promise.all(promises).then((data) => data.flat());
      });
    },
  },
};
