const knex = require("../connection");
const { Item } = require("./Item");
const { getItemById, deleteItem } = require("./utils");

const ingredients = new Map([
  ["hop_ingredient", "hopIngredients"],
  ["grain_ingredient", "grainIngredients"],
  ["adjunct_ingredient", "adjunctIngredients"],
  ["yeast_ingredient", "yeastIngredients"],
]);

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
      return knex("recipes").select().where("user", user.id);
    },
  },
  Recipe: {
    ingredients: async ({ id }) => {
      try {
        return knex("ingredients").select().where("recipe", id);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Ingredient: {
    item: async ({ item }) => {
      return getItemById(item, "items");
    },
  },
  Item,
  Mutation: {
    addRecipe: async (_, { input }, { user }) => {
      try {
        return knex.transaction(async (trx) => {
          const inputValues = getInputValues(input);

          const recipe = await trx("recipes")
            .insert({
              ...inputValues,
              user: user.id,
            })
            .returning("*");
          const { id } = recipe[0];

          const promises = input.ingredients.map((ingredient) => {
            return items.map((item) => {
              return trx("ingredients")
                .insert({
                  ...item,
                  recipe: id,
                })
                .returning("id");
            });
          });

          await Promise.all(promises);

          return recipe[0];
        });
      } catch (e) {
        console.error(e);
      }
    },

    updateRecipe: async (_, { id, input }, { user }) => {
      try {
        return knex.transaction(async (trx) => {
          const inputValues = getInputValues(input);
          const recipe = await trx("recipes")
            .where({ id, user: user.id })
            .update(inputValues)
            .returning("*");

          const promises = [...ingredients].flatMap(async ([table, name]) => {
            const items = input[name];
            const ingData = await trx(table)
              .select()
              .where({ recipe: id })
              .returning("id");

            for (const it of ingData) {
              if (!items.some((item) => Number(item.id) === Number(it.id))) {
                await trx(table).where({ id: it.id }).del();
              }
            }

            if (items && items.length) {
              return items.map(async (item) => {
                if (item.id) {
                  return trx(table)
                    .where({ id: item.id })
                    .update(item)
                    .returning("*");
                }
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
          await Promise.all(promises);
          return recipe[0];
        });
      } catch (e) {
        console.error(e);
      }
    },

    deleteRecipe: async (_, { id }, { user }) => {
      return deleteItem(id, user.id, "recipes");
    },
  },
};
