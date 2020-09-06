export const getAbv = (og, fg) => {
  return parseFloat(((og - fg) * 105 * 1.25).toFixed(2));
};
