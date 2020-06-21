exports.up = async function(knex) {
  return Promise.all([
    knex.schema.createTable("adjuncts", table => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("description");
    })
  ]);
};

exports.down = async function(knex) {
  return knex.schema.dropTable("adjuncts");
};
