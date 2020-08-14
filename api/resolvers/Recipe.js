const knex = require("../connection");
const { Hop } = require("./Hop");
const { Grain } = require("./Grain");

module.exports = {
  Query: {
    recipes: async (_, __, { user }) => {
      return knex("recipe").select().where("user", user.id);
    },
  },
  Recipe: {
    hops: async ({ hops }) => {
      return hops;
    },
  },
  HopIngredient: {
    hop: async ({ hop }) => {
      try {
        return await knex("hops").first().where("id", hop);
      } catch (e) {
        console.error(`Error fetching item from hops`, e);
      }
    },
  },
  Hop,
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
        hops,
        grains,
        adjuncts,
        yeast,
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
      if (input.hops) {
        var hopProms = hops.map((hop) => {
          return knex("hop_ingredient")
            .insert({
              amount: hop.amount,
              hop: hop.hop,
              timing: hop.timing,
              recipe: recipe[0].id,
            })
            .returning("*");
        });
      }
      const hopData = await Promise.all(hopProms);
      return { ...recipe[0], hops: hopData.flat() };
    },
  },
};
