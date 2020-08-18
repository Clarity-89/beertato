const knex = require("../connection");

module.exports.getItemById = async (id, table) => {
  try {
    return await knex(table).first().where("id", id);
  } catch (e) {
    console.error(`Error fetching item from ${table}`, e);
  }
};

module.exports.deleteItem = async (id, userId, table) => {
  try {
    const resp = await knex(table)
      .where({ id, user: userId })
      .del()
      .returning("id");
    return resp.length ? resp[0] : null;
  } catch (e) {
    throw new Error(e);
  }
};
