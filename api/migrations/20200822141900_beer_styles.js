exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("beer_styles", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("category");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("beer_styles")]);
};
