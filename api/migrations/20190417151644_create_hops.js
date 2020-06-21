exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable("hops", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table
          .integer("origin")
          .references("countries.id")
          .onDelete("CASCADE");
        table.enu("purpose", ["bittering", "aroma", "dual"]);
        table.string("alpha_acid_composition");
        table.string("beta_acid_composition");
        table.string("description");
        table.string("sub_names");
        table.string("beer_style");
        table.string("image");
      })
      .catch(error => console.log("error migrating hops", error)),

    knex.schema
      .createTable("hops_substitutes", table => {
        table.increments("id").primary();
        table
          .integer("hop")
          .references("hops.id")
          .onDelete("CASCADE");
        table
          .integer("substitute")
          .references("hops.id")
          .onDelete("CASCADE");
      })
      .catch(error => console.log("error migrating hop subs", error))
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw("DROP TABLE if exists hops_substitutes CASCADE"),
    knex.schema.raw("DROP TABLE  if exists hops CASCADE")
  ]);
};
