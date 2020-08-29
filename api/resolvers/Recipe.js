const knex = require("../connection");
const { Item } = require("./Item");
const { getItemById, deleteItem } = require("./utils");

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
    brew_date: input.brewDate,
  };
};

module.exports = {
  Query: {
    recipes: async (_, __, { user }) => {
      return knex("recipes").select().where("user", user.id);
    },
    recipe: async (_, { id }, { user }) => {
      return knex("recipes").first().where({ user: user.id, id });
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

          const ingredients = (input.ingredients || []).map((ingredient) => ({
            ...ingredient,
            recipe: id,
          }));

          await trx("ingredients").insert(ingredients);

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

          const ingData = await trx("ingredients")
            .select()
            .where({ recipe: id })
            .returning("id");

          // Remove ingredients not in updated list
          for (const it of ingData) {
            if (
              !input.ingredients.some(
                (item) => Number(item.id) === Number(it.id)
              )
            ) {
              await trx("ingredients").where({ id: it.id }).del();
            }
          }

          const promises = (input.ingredients || []).map((ingredient) => {
            if (ingredient.id) {
              return trx("ingredients")
                .where({ id: ingredient.id })
                .update(ingredient);
            }
            return trx("ingredients").insert({ ...ingredient, recipe: id });
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
