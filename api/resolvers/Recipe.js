const knex = require("../connection");
const { Item } = require("./Item");
const { getItemById, deleteItem } = require("./utils");

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
          const { ingredients, ...inputValues } = input;

          const recipe = await trx("recipes")
            .insert({
              ...inputValues,
              user: user.id,
            })
            .returning("*");
          const { id } = recipe[0];

          const ingredientVals = (ingredients || []).map((ingredient) => ({
            ...ingredient,
            recipe: id,
          }));

          await trx("ingredients").insert(ingredientVals);

          return recipe[0];
        });
      } catch (e) {
        console.error(e);
      }
    },

    updateRecipe: async (_, { id, input }, { user }) => {
      try {
        return knex.transaction(async (trx) => {
          const { ingredients, ...inputValues } = input;
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
              !ingredients.some((item) => Number(item.id) === Number(it.id))
            ) {
              await trx("ingredients").where({ id: it.id }).del();
            }
          }

          const promises = (ingredients || []).map((ingredient) => {
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
