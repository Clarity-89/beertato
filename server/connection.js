const knex = require("knex");
const connection = require("./knexfile").development;

module.exports = knex(connection);
