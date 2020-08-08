const knex = require("../connection");
const { Hop } = require("./Hop");
const { Grain } = require("./Grain");

const getInventoryItems = async (user, table) => {
  try {
    return knex(table).select().where("user", user.id);
  } catch (e) {
    throw new Error(e);
  }
};

const getItemById = async (id, table) => {
  try {
    return await knex(table).first().where("id", id);
  } catch (e) {
    console.error(`Error fetching item from ${table}`, e);
  }
};

module.exports = {
  Query: {
    hopInventory: async (_, __, { user }) => {
      return getInventoryItems(user, "hops_inventory");
    },
    grainInventory: async (_, __, { user }) => {
      return getInventoryItems(user, "grains_inventory");
    },
    adjunctInventory: async (_, __, { user }) => {
      return getInventoryItems(user, "adjuncts_inventory");
    },
  },
  HopInventory: {
    hop: async ({ hop }) => getItemById(hop, "hops"),
  },
  GrainInventory: {
    grain: async ({ grain }) => getItemById(grain, "grains"),
  },
  AdjunctInventory: {
    adjunct: async ({ adjunct }) => getItemById(adjunct, "adjuncts"),
  },
  Grain,
  Hop,
  Mutation: {
    addHopInventory: async (_, { amount, hop }, { user }) => {
      // If item with a give hop id exists, update that item's amount
      const existingItem = await knex("hops_inventory")
        .first()
        .where({ hop, user: user.id });

      if (existingItem) {
        const res = await knex("hops_inventory")
          .where({ hop, user: user.id })
          .update({ amount })
          .returning(["id", "hop", "amount", "user"]);
        return res[0];
      }

      try {
        const inventory = await knex("hops_inventory")
          .insert({
            user: user.id,
            amount,
            hop,
          })
          .returning(["id", "hop", "amount", "user"]);
        return inventory[0];
      } catch (e) {
        throw new Error(e);
      }
    },
    updateHopInventory: async (_, { amount, id }, { user }) => {
      try {
        const res = await knex("hops_inventory")
          .where({ id, user: user.id })
          .update({ amount })
          .returning(["id", "hop", "amount", "user"]);
        return res[0];
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
