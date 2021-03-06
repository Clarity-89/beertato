exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("username");
      table.string("password").notNullable();
      table.string("email").notNullable().unique();
      table.string("picture");
      table.string("date_joined");
      table.boolean("is_admin").defaultTo(false);
      table
        .enum("plan", ["FREE", "BASIC", "PRO", "UNLIMITED"])
        .defaultTo("FREE");
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
