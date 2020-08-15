const knex = require("../connection");
const { Hop } = require("./Hop");
const { Grain } = require("./Grain");
const { getItemById } = require("./utils");

const getIngredients = async (table, id) => {
  try {
    return knex("hop_ingredient").select().where("recipe", id);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  Query: {
    recipes: async (_, __, { user }) => {
      return knex("recipe").select().where("user", user.id);
    },
  },
  Recipe: {
    hopIngredients: async ({ id }) => {
      return getIngredients("hop_ingredients", id);
    },
    grainIngredients: async ({ id }) => {
      return getIngredients("grain_ingredients", id);
    },
    adjunctIngredients: async ({ id }) => {
      return getIngredients("adjunct_ingredients", id);
    },
    yeastIngredients: async ({ id }) => {
      return getIngredients("yeast_ingredients", id);
    },
  },
  HopIngredient: {
    hop: async ({ hop }) => {
      return getItemById(hop, "hops");
    },
  },
  Hop,
  GrainIngredient: {
    grain: async ({ grain }) => {
      return getItemById(grain, "grains");
    },
  },
  Grain,
  AdjunctIngredient: {
    adjunct: async ({ adjunct }) => {
      return getItemById(adjunct, "adjuncts");
    },
  },
  YeastIngredient: {
    yeast: async ({ yeast }) => {
      return getItemById(yeast, "yeast");
    },
  },
  Mutation: {
    addRecipe: async (_, { input }, { user }) => {
      const {
        name,
        volume,
        boilVolume,
        abv,
        originalGravity,
        finalGravity,
        notes,
        description,
        ebc,
        ibu,
        srm,
        ph,
        attenuation,
        mashTemp,
        mashDuration,
        fermentationTemp,
        fermentationDuration,
      } = input;

      const recipe = await knex("recipe")
        .insert({
          name,
          volume,
          boil_volume: boilVolume,
          abv,
          original_gravity: originalGravity,
          final_gravity: finalGravity,
          notes,
          description,
          ebc,
          ibu,
          srm,
          ph,
          attenuation,
          mash_temp: mashTemp,
          mash_duration: mashDuration,
          fermentation_temp: fermentationTemp,
          fermentation_duration: fermentationDuration,
          user: user.id,
        })
        .returning("*");
      const { id } = recipe[0];

      const ingredients = new Map([
        ["hop_ingredient", "hopIngredients"],
        ["grain_ingredient", "grainIngredients"],
        ["adjunct_ingredient", "adjunctIngredients"],
        ["yest_ingredient", "yeastIngredients"],
      ]);

      const promises = [...ingredients]
        .flatMap(([table, name]) => {
          const items = input[name];
          if (items && items.length) {
            return items.map((item) => {
              return knex(table)
                .insert({
                  ...item,
                  recipe: id,
                })
                .returning("*");
            });
          }
        })
        .filter(Boolean);

      const hopData = await Promise.all(promises);
      return { ...recipe[0], hopIngredients: hopData };
    },
  },
};
