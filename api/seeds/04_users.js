const bcrypt = require("bcrypt");
const { password, email } = process.env;

exports.seed = async function (knex) {
  const pass = await bcrypt.hash(password, 10);
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          first_name: "Admin",
          username: "admin",
          email,
          password: pass,
          date_joined: new Date(),
          is_admin: true,
          plan: "UNLIMITED",
        },
      ]);
    });
};
