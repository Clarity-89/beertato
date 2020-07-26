const knex = require("../connection");

module.exports = {
  Query: {
    hopInventory: async (_, args, { user }) => {
      if (!user) {
        throw new Error("You are not authenticated!");
      }
    },
  },
};
