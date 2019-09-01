const fs = require("fs");

module.exports = (type = "components") => {
  console.log("t", type);
  const names = fs.readdirSync("src/" + type);
  return names.map(i => i.replace(".js", ""));
};
