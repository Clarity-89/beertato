/** Do not send empty form fields to backend
 *
 * @param data
 * @return {any}
 */
export const removeEmptyFields = (data) => {
  return Object.entries(data).reduce(
    (acc, [key, val]) => (val ? { ...acc, [key]: val } : acc),
    {}
  );
};

export const processFormData = ({ recipe, ingredients = [] }) => {
  const recipeData = removeEmptyFields(recipe);
  const ingredientData = ingredients.map((ingredient) => ({
    ...ingredient,
    item: ingredient?.item?.id || ingredient.item,
  }));

  return { ...recipeData, ingredients: ingredientData };
};
