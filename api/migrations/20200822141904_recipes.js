exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("recipes", (table) => {
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
      table.date("brew_date");
      table.integer("user").references("users.id").onDelete("CASCADE");
    }),
    knex.schema.createTable("ingredients", (table) => {
      table.increments("id").primary();
      table.float("amount");
      table.float("timing");
      table.integer("item").references("items.id").onDelete("CASCADE");
      table.integer("recipe").references("recipes.id").onDelete("CASCADE");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("ingredients"),
    knex.schema.dropTable("recipes"),
  ]);
};
