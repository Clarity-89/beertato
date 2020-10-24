import { YEAST } from "../../constants";

export const getAbv = (og, fg) => {
  return parseFloat(((og - fg) * 105 * 1.25).toFixed(2));
};

/**
 * Get Alpha Acid Composition from hop ingredient
 * @param hop
 * @return {*}
 */
const getAA = (hop) => {
  try {
    const data = JSON.parse(hop.data);
    return data.alpha_acid_composition;
  } catch (e) {
    console.error("error parsing hop data", e);
  }
};

/**
 * Calculate IBU of beer for all the hop ingredients
 * @param hops - list of hops used
 * @param og - original gravity (after boil)
 * @param volume - post-boil volume (liters)
 * @param boilTime - total boil time (minutes)
 * @return {number}
 */
export const getIBU = (hops, og, volume, boilTime) => {
  if (!hops?.length || !og || !volume || !boilTime) {
    return 0;
  }

  const ibus = hops.map((hop) => {
    const time = boilTime - hop.timing;
    const rightSide = (1 - Math.E ** (-0.04 * time)) / 4.15;
    return (
      (75 *
        getAA(hop.item) *
        // Convert grams to ounces
        (hop.amount / 28) *
        1.65 *
        0.000125 ** (og - 1) *
        rightSide) /
      // Convert liters to gallons
      (volume / 3.785411784)
    );
  });
  return Number(ibus.reduce((sum, ibu) => ibu + sum, 0).toFixed());
};

/**
 * Scale recipe's ingredients amount proportionately to the boil volume
 * @param origVol - original boil volume
 * @return {function(*=, *, *): (undefined)}
 */
export const scaleRecipe = (origVol) => {
  let original = origVol;
  return (newVol, ingredients, setValue) => {
    if (original === newVol || !original || !newVol || !ingredients?.length) {
      return;
    }
    const ratio = original / newVol;

    ingredients.forEach((ing, index) => {
      if (ing.item.type !== YEAST) {
        setValue(`ingredients[${index}].amount`, Math.ceil(ing.amount / ratio));
      }
    });

    original = newVol;
  };
};
