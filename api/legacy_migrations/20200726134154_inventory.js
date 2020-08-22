exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("hops_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("hop").references("hops.id").onDelete("CASCADE");
      table.integer("user").references("users.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("grains_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("grain").references("grains.id").onDelete("CASCADE");
      table.integer("user").references("users.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("yeast_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("yeast").references("yeast.id").onDelete("CASCADE");
      table.integer("user").references("users.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("adjuncts_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("adjunct").references("adjuncts.id").onDelete("CASCADE");
      table.integer("user").references("users.id").onDelete("CASCADE");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("hops_inventory"),
    knex.schema.dropTable("grains_inventory"),
    knex.schema.dropTable("yeast_inventory"),
    knex.schema.dropTable("adjuncts_inventory"),
  ]);
};
