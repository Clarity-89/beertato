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

const addItem = async (item_type, table, { user, amount, ...data }) => {
  const existingItem = await knex(table)
    .first()
    .where({ [item_type]: data[item_type], user: user.id });

  if (existingItem) {
    const res = await knex(table)
      .where({ [item_type]: data[item_type], user: user.id })
      .update({ amount })
      .returning(["id", item_type, "amount", "user"]);
    return res[0];
  }

  try {
    const inventory = await knex(table)
      .insert({
        user: user.id,
        amount,
        [item_type]: data[item_type],
      })
      .returning(["id", item_type, "amount", "user"]);
    return inventory[0];
  } catch (e) {
    throw new Error(e);
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
    addHopInventory: async (_, { amount, item_id }, { user }) => {
      return addItem("hop", "hops_inventory", { hop: item_id, user, amount });
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
    deleteHopInventory: async (_, { id }, { user }) => {
      try {
        const resp = await knex("hops_inventory")
          .where({ id, user: user.id })
          .del()
          .returning("id");
        return resp.length ? resp[0] : null;
      } catch (e) {
        throw new Error(e);
      }
    },
    addGrainInventory: async (_, { amount, item_id }, { user }) => {
      return addItem("grain", "grains_inventory", {
        grain: item_id,
        user,
        amount,
      });
    },
    addAdjunctInventory: async (_, { amount, item_id }, { user }) => {
      return addItem("adjunct", "adjuncts_inventory", {
        adjunct: item_id,
        user,
        amount,
      });
    },
  },
};
