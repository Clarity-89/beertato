exports.up = function (knex) {
  return Promise.all([
    knex.schema
      .createTable("countries", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("code");
      })
      .catch((error) => console.log("error migrating countries", error)),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.raw("DROP TABLE if exists countries CASCADE"),
  ]);
};
