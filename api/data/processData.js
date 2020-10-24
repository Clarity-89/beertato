const fs = require("fs");
const adjuncts = require("./root/adjuncts.json");
const grains = require("./root/grains.json");
const hops = require("./root/hops.json");
const yeast = require("./root/yeast.json");
const { ITEM_TYPES } = require("../constants");

const data = [];
let uid = 270;

adjuncts.forEach((it) => {
  const { name, origin, description, id, ...rest } = it;
  data.push({
    name,
    origin,
    description,
    id: uid,
    type: ITEM_TYPES.ADJUNCT,
    data: JSON.stringify(rest),
  });
  uid++;
});
hops.forEach((it) => {
  const { name, origin, description, id, ...rest } = it;
  data.push({
    name,
    origin,
    description,
    id,
    type: ITEM_TYPES.HOP,
    data: JSON.stringify(rest),
  });
});
grains.forEach((it) => {
  const { name, origin, description, id, ...rest } = it;
  data.push({
    name,
    origin,
    description,
    id: uid,
    type: ITEM_TYPES.GRAIN,
    data: JSON.stringify(rest),
  });
  uid++;
});
yeast.forEach((it) => {
  const { name, origin, description, id, ...rest } = it;
  data.push({
    name,
    origin: origin || 0,
    description,
    id: uid,
    type: ITEM_TYPES.YEAST,
    data: JSON.stringify(rest),
  });
  uid++;
});

fs.writeFile("./data/items.json", JSON.stringify(data), "utf8", (d) =>
  console.log("cb", d)
);
