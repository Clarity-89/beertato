const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const knex = require("../connection");
require("dotenv").config();

module.exports = {
  Query: {
    me: async (_, args, { user }) => {
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      try {
        const users = await knex("users").select().where("id", user.id);
        return users[0];
      } catch (e) {
        console.error("Error retrieving user", e);
      }
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const pass = await bcrypt.hash(password, 10);
      try {
        // TODO add email validation
        const user = await knex("users")
          .insert({ username, email, password: pass })
          .returning(["id", "email"]);

        return jsonwebtoken.sign(
          { id: user[0].id, email: user[0].email },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
      } catch (e) {
        throw e.detail;
      }
    },

    login: async (_, { email, password }) => {
      const userResp = await knex("users").select().where("email", email);
      const user = userResp[0];

      if (!user) {
        throw new Error("No user with that email");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Incorrect password");
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    },
  },
};
