exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("adjuncts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("adjuncts").insert([
        {
          id: 7,
          name: "Brown Sugar, Dark",
          origin: 8,
          description:
            "Imparts a rich sweet flavor. Used in Scottish ales, holiday ales and some old ales.",
        },
        {
          id: 8,
          name: "Brown Sugar, Light",
          origin: 8,
          description:
            "Imparts a rich sweet flavor. Used in Scottish ales, holiday ales and some old ales.",
        },
        {
          id: 9,
          name: "Candi Sugar, Amber",
          origin: 2,
          description:
            "Crystalized Candi Sugar (Sucrose) used in many Belgian Tripels, Dubbels, and holiday ales.  Adds head retention and sweet aroma to beer.  Darker variants also add color.",
        },
        {
          id: 10,
          name: "Candi Sugar, Clear",
          origin: 2,
          description:
            "Crystalized Candi Sugar (Sucrose) used in many Belgian Tripels, Dubbels, and holiday ales.  Adds head retention and sweet aroma to beer.  Darker variants also add color.",
        },
        {
          id: 11,
          name: "Candi Syrup - 90",
          origin: 2,
          description:
            "Liquid Candi Sugar (Sucrose) from beets and dates used in many Belgian Tripels, Dubbels, and holiday ales.  Adds head retention and sweet aroma to beer.  Darker variants also add color.",
        },
        {
          id: 12,
          name: "Cane (Beet) Sugar",
          origin: 8,
          description:
            "Common household baking sugar.\nLightens flavor and body of beer.\nCan contribute a cider-like flavor to the beer if not cold-fermented or used in large quantities.",
        },
        {
          id: 35,
          name: "Corn Sugar (Dextrose)",
          origin: 8,
          description:
            "Widely used for bottling at rate of approx 2/3 cup per 5 gallons of beer",
        },
        {
          id: 36,
          name: "Corn Syrup",
          origin: 8,
          description:
            "Syrup derived from corn with many of the same properties as corn sugar.  May be used to enhance gravity without adding much body or flavor.  Limit percentage in batch to avoid wine/cider flavors.",
        },
        {
          id: 39,
          name: "Dememera Sugar",
          origin: 7,
          description:
            "Dark, unrefined brown sugar that contains molasses and other dark impurities.  Great for brown ales and porters.  Adds slight sweetness and smooth character.",
        },
        {
          id: 41,
          name: "Grits",
          origin: 8,
          description:
            "Imparts a corn or grain taste. Mash required. Used to increase gravity of American lagers.",
        },
        {
          id: 42,
          name: "Honey",
          origin: 8,
          description:
            "Can be used to lighten flavor and body when substituted for malt.\nGenerally limit to 30% when used as an adjunct. Pasturize and add to primary during fermentation. Use up to 100% for meads.",
        },
        {
          id: 43,
          name: "Invert Sugar",
          origin: 7,
          description:
            "Used to increase starting gravity and also as an adjunct for some Belgian and English ales.",
        },
        {
          id: 45,
          name: "Lyle's Golden Syrup",
          origin: 7,
          description:
            "Liquid Invert Sugar.  Used to increase alcohol and lighten the beer without alterning flavor.  Used in Belgian ales and some English ales.",
        },
        {
          id: 46,
          name: "Maple Syrup",
          origin: 8,
          description:
            "If added during the boil it will add a dry, woodsy flavor. If added at bottling, the smooth maple flavor comes through.  Used for maple ales, porters, browns.",
        },
        {
          id: 47,
          name: "Milk Sugar (Lactose)",
          origin: 8,
          description:
            "Not fully fermentable, so it adds lasting sweetness. Lactose can be added to lend  sweetness to Sweet Stouts and Porters.",
        },
        {
          id: 48,
          name: "Molasses",
          origin: 8,
          description:
            "Imparts a strong, sweet flavor.  Used primarily in stouts and porters.",
        },
        {
          id: 52,
          name: "Rice Extract Syrup",
          origin: 8,
          description:
            "Used like other rice adjuncts in American and Japenes lagers to provide a dry, clean taste and light body.  Adds gravity without changing body or flavor substantially.  Use in place of corn sugar in small quantities.",
        },
        {
          id: 60,
          name: "Treacle",
          origin: 7,
          description:
            'UK mixture of molasses, invert sugar and golden (corn) syrup.  Imparts an intense sweet flavor and dark color.  Used in dark English ales.  Also called "Black Treacle" or the brand name "Lyle\'s Black Treacle Syrup."',
        },
        {
          id: 61,
          name: "Turbinado",
          origin: 7,
          description:
            "Light, raw brown sugar.  May be used in British pale ales or high gravity Belgian ales.  Limit percentage used to avoid undesirable flavors.  Similar to Demerara sugar.",
        },
        {
          id: 110,
          name: "Candi Sugar, Dark",
          origin: 2,
          description:
            "Crystalized Candi Sugar (Sucrose) used in many Belgian Tripels, Dubbels, and holiday ales.  Adds head retention and sweet aroma to beer.  Darker variants also add color.",
        },
        {
          id: 113,
          name: "Candi Syrup - 180",
          origin: 2,
          description:
            "Liquid Candi Sugar (Sucrose) from beets and dates used in many Belgian Tripels, Dubbels, and holiday ales.  Adds head retention and sweet aroma to beer.  Darker variants also add color.",
        },
      ]);
    });
};
