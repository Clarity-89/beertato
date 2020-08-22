exports.up = async function(knex) {
  return Promise.all([
    knex.schema.createTable("yeast", table => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("lab");
      table.string("code");
      table.string("beer_type");
      table.enu("flocculation", ["low", "medium", "high"]);
      table.string("temperature");
      table.text("description");
      table.decimal("attenuation");
      table.enu("type", ["dried", "liquid"]);
      table.string("image");
    })
  ]).catch(error => console.log("error migrating yeast", error));
};

exports.down = async function(knex) {
  return knex.schema.dropTable("yeast");
};
