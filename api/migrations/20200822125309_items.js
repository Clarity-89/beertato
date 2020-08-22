const { ITEM_TYPES } = require("../constants");

exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("items", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("image");
      table.enu("type", Object.values(ITEM_TYPES));
      table.text("description");
      table.integer("origin").references("countries.id");
      table.jsonb("data");
    }),
    knex.schema.createTable("substitutes", (table) => {
      table.increments("id").primary();
      table.integer("item").references("items.id").onDelete("CASCADE");
      table.integer("substitute").references("items.id").onDelete("CASCADE");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.raw("DROP TABLE if exists substitutes CASCADE"),
    knex.schema.raw("DROP TABLE  if exists items CASCADE"),
  ]);
};
