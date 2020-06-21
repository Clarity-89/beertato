exports.up = async function(knex) {
  try {
    return knex.schema.createTable("grains", table => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table
        .integer("origin")
        .references("countries.id")
        .onDelete("CASCADE");
      table.decimal("yield");
      table.decimal("color");
      table.decimal("protein");
      table.integer("mash");
      table.text("description");
      table.string("image");
    });
  } catch (e) {
    console.log("error migrating grains", error);
  }
};

exports.down = async function(knex) {
  return knex.schema.dropTable("grains");
};
