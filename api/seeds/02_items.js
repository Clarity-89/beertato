const items = require("../data/items.json");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert(items);
    });

  // Update the last id for autoincrement to work correctly
  await knex.raw("select setval('items_id_seq', max(id)) from items");
};
