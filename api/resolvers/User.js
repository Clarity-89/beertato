const bcrypt = require("bcrypt");
const knex = require("../connection");
const { getSignedToken } = require("../utils/getSignedToken");
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
    signup: async (_, data) => {
      const pass = await bcrypt.hash(data.password, 10);
      try {
        // TODO add email validation
        const user = await knex("users")
          .insert({
            username: data.username,
            email: data.email,
            password: pass,
            data_joined: new Date(),
          })
          .returning(["id", "email", "username"]);

        const { id, email, username } = user[0];

        return {
          id,
          email,
          username,
          token: getSignedToken(id),
        };
      } catch (e) {
        throw e.detail;
      }
    },

    login: async (_, { email: userEmail, password }) => {
      const userResp = await knex("users").select().where("email", userEmail);
      const user = userResp[0];

      if (!user) {
        throw new Error("No user with that email");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Incorrect password");
      }

      const { id, email, username } = user;
      // return json web token
      return {
        id,
        email,
        username,
        token: getSignedToken(id),
      };
    },
  },
};
