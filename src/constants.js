import {
  ADD_HOP_ITEM,
  DELETE_HOP_ITEM,
  GET_HOPS,
  HOP_INVENTORY,
  UPDATE_HOP_ITEM,
  GRAIN_INVENTORY,
} from "./components/Dashboard/queries";

export const TOKEN_KEY = "token";

const inventoryMap = {
  hops: {
    queries: {
      list: HOP_INVENTORY,
      add: ADD_HOP_ITEM,
      update: UPDATE_HOP_ITEM,
      delete: DELETE_HOP_ITEM,
      selectList: GET_HOPS,
    },
  },
  grains: {
    list: GRAIN_INVENTORY,
    // add: ADD_GRAIN_ITEM,
    // update: UPDATE_GRAIN_ITEM,
    // delete: DELETE_GRAIN_ITEM,
    // selectList: GET_GRAINS,
  },
};
