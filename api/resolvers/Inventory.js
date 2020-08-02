const knex = require("../connection");
const { Hop } = require("./Hop");
const { Grain } = require("./Grain");

const getInventoryItem = async (user, table) => {
  if (!user) {
    throw new Error("You are not authenticated!");
  }

  try {
    return await knex(table).select().where("user", user.id);
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
      return getInventoryItem(user, "hops_inventory");
    },
    grainInventory: async (_, __, { user }) => {
      return getInventoryItem(user, "grains_inventory");
    },
    adjunctInventory: async (_, __, { user }) => {
      return getInventoryItem(user, "adjuncts_inventory");
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
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      try {
        const inventory = await knex("hops_inventory")
          .insert({
            user: user.id,
            amount,
            hop,
          })
          .returning(["id", "hop", "amount"]);
        return inventory[0];
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
