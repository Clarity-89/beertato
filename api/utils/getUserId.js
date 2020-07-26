const jwt = require("jsonwebtoken");

module.exports.getUserId = (req) => {
  const header = req.header.authorization;

  console.log("HEADER", header);
};
