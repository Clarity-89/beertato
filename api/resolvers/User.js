const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const knex = require("../connection");
require("dotenv").config();

module.exports = {
  Query: {
    me: async (_, { id }) => {
      try {
        const users = await knex("users").select().where("id", id);
        return users[0];
      } catch (e) {
        console.error("Error retrieving user", e);
      }
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const pass = await bcrypt.hash(password, 10);
      const user = knex("users").insert([{ username, email, password: pass }]);

      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );
    },
  },
};
