exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("recipe", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.integer("volume");
      table.integer("boil_volume");
      table.float("abv");
      table.float("original_gravity");
      table.float("final_gravity");
      table.text("notes");
      table.text("description");
      table.float("ebc");
      table.integer("ibu");
      table.float("srm");
      table.float("ph");
      table.float("attenuation");
      table.integer("mash_temp");
      table.float("mash_duration");
      table.float("fermentation_temp");
      table.integer("fermentation_duration");
      table.integer("user").references("users.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("hop_ingredient", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.float("timing");
      table.integer("hop").references("hops.id").onDelete("CASCADE");
      table.integer("recipe").references("recipe.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("grain_ingredient", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("grain").references("grains.id").onDelete("CASCADE");
      table.integer("recipe").references("recipe.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("adjunct_ingredient", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("adjunct").references("adjuncts.id").onDelete("CASCADE");
      table.integer("recipe").references("recipe.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("yeast_ingredient", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.integer("yeast").references("yeast.id").onDelete("CASCADE");
      table.integer("recipe").references("recipe.id").onDelete("CASCADE");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("hop_ingredient"),
    knex.schema.dropTable("grain_ingredient"),
    knex.schema.dropTable("adjunct_ingredient"),
    knex.schema.dropTable("yeast_ingredient"),
    knex.schema.dropTable("recipe"),
  ]);
};
