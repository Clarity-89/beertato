/**
 * Convert camel case to sentence case. If the value is an abbreviation, i.e. 3 words or less,
 * capitalise it
 * @param value
 */
export const formatLabel = (value = "") => {
  if (value.length <= 3) {
    return value.toUpperCase();
  }

  const result = value.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
