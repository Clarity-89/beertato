exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("id").primary();
    table.float("amount");
    table.integer("item").references("items.id").onDelete("CASCADE");
    table.integer("user").references("users.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("inventory");
};
