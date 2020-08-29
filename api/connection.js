const knex = require("knex");
const connection = require("./knexfile").development;

const toSnakeCase = (value) => {
  if (value === "*") return value;
  return `${value
    .replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`)
    .replace(/"/g, '""')}`;
};

const toCamelCase = (row) => {
  return Object.entries(row).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key.replace(/([-_]\w)/g, (g) => g[1].toUpperCase())]: value,
    };
  }, {});
};

module.exports = knex({
  ...connection,
  wrapIdentifier: (value, origImpl) => {
    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map((row) => toCamelCase(row));
    } else {
      return toCamelCase(result);
    }
  },
});
