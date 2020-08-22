const subs = require("../data/substitutes.json");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("substitutes")
    .del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([knex("substitutes").insert(subs)]).catch((err) =>
        console.log("Error seeding subs", err)
      );
    });
};
