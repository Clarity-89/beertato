import * as q from "./components/Dashboard/queries";

export const TOKEN_KEY = "token";

export const queryMap = {
  hop: {
    list: q.HOP_INVENTORY,
    add: q.ADD_HOP_ITEM,
    update: q.UPDATE_HOP_ITEM,
    delete: q.DELETE_HOP_ITEM,
    selectList: q.GET_HOPS,
  },
  grain: {
    list: q.GRAIN_INVENTORY,
    add: q.ADD_GRAIN_ITEM,
    update: q.UPDATE_GRAIN_ITEM,
    delete: q.DELETE_GRAIN_ITEM,
    selectList: q.GET_GRAINS,
  },
  adjunct: {
    list: q.ADJUNCT_INVENTORY,
    add: q.ADD_ADJUNCT_ITEM,
    update: q.UPDATE_ADJUNCT_ITEM,
    delete: q.DELETE_ADJUNCT_ITEM,
    selectList: q.GET_ADJUNCTS,
  },
};
