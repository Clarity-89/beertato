exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("hops_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("hop_id").references("hops.id");
      table.integer("user_id").references("users.id");
    }),
    knex.schema.createTable("grains_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("grain_id").references("grains.id");
      table.integer("user_id").references("users.id");
    }),
    knex.schema.createTable("yeast_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("yeast_id").references("yeast.id");
      table.integer("user_id").references("users.id");
    }),
    knex.schema.createTable("adjuncts_inventory", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("adjunct_id").references("adjuncts.id");
      table.integer("user_id").references("users.id");
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
