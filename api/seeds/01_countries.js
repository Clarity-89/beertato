const data = require("../data/countries.json");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("countries")
    .del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([knex("countries").insert(data)]).catch((err) =>
        console.log("Error seeding countries", err)
      );
    });
};
