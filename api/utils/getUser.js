const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

module.exports.getUser = (req) => {
  const header = req.headers.authorization;

  if (header) {
    try {
      const token = header.replace("Bearer ", "");
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError(e);
    }
  }

  return null;
};
