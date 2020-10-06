exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("beer_styles", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("category");
      table.string("category_description");
      table.string("description");
      table.string("color");
      table.string("ibu");
      table.string("abv");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("beer_styles")]);
};
