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
