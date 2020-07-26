const knex = require("../connection");

module.exports = {
  Query: {
    hopInventory: async (_, args, { user }) => {
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      try {
        return await knex("hops_inventory").select().where("user_id", user.id);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    addHopInventory: async (_, args, { user }, { variableValues }) => {
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      try {
        const inventory = await knex("hops_inventory")
          .insert({
            user_id: user.id,
            amount: variableValues.amount,
            hop_id: variableValues.hop_id,
          })
          .returning(["id"]);
        return inventory[0].id;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
