const knex = require("../connection");
const { Hop } = require("./Hop");
const { Grain } = require("./Grain");
const { getItemById } = require("./utils");

const ingredients = new Map([
  ["hop_ingredient", "hopIngredients"],
  ["grain_ingredient", "grainIngredients"],
  ["adjunct_ingredient", "adjunctIngredients"],
  ["yest_ingredient", "yeastIngredients"],
]);

const getIngredients = async (table, id) => {
  try {
    return knex("hop_ingredient").select().where("recipe", id);
  } catch (e) {
    throw new Error(e);
  }
};

const getInputValues = (input) => {
  return {
    name: input.name,
    volume: input.volume,
    boil_volume: input.boilVolume,
    abv: input.abv,
    original_gravity: input.originalGravity,
    final_gravity: input.finalGravity,
    notes: input.notes,
    description: input.description,
    ebc: input.ebc,
    ibu: input.ibu,
    srm: input.srm,
    ph: input.ph,
    attenuation: input.attenuation,
    mash_temp: input.mashTemp,
    mash_duration: input.mashDuration,
    fermentation_temp: input.fermentationTemp,
    fermentation_duration: input.fermentationDuration,
  };
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
      try {
        await knex.transaction(async (trx) => {
          const inputValues = getInputValues(input);

          const recipe = await trx("recipe")
            .insert({
              ...inputValues,
              user: user.id,
            })
            .returning("*");
          const { id } = recipe[0];

          const promises = [...ingredients].flatMap(([table, name]) => {
            const items = input[name];
            if (items && items.length) {
              return items.map((item) => {
                return trx(table)
                  .insert({
                    ...item,
                    recipe: id,
                  })
                  .returning("*");
              });
            }
            return [];
          });

          const hopData = await Promise.all(promises);
          return { ...recipe[0], hopIngredients: hopData };
        });
      } catch (e) {
        console.error(e);
      }
    },

    updateRecipe: async (_, { id, input }, { user }) => {
      const inputValues = getInputValues(input);
      const recipe = await knex("recipe")
        .where({ id, user: user.id })
        .update(inputValues)
        .returning("*");
    },
  },
};
