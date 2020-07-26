const knex = require("../connection");
const { Hop } = require("./Hop");

module.exports = {
  Query: {
    hopInventory: async (_, args, { user }) => {
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      try {
        return await knex("hops_inventory").select().where("user", user.id);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  HopInventory: {
    hop: async ({ hop }) => {
      try {
        return await knex("hops").first().where("id", hop);
      } catch (e) {
        console.error("Error fetching hop", e);
      }
    },
  },
  Hop,
  Mutation: {
    addHopInventory: async (_, args, { user }, { variableValues }) => {
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      try {
        const inventory = await knex("hops_inventory")
          .insert({
            user: user.id,
            amount: variableValues.amount,
            hop: variableValues.hop,
          })
          .returning("id");
        return inventory[0];
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
