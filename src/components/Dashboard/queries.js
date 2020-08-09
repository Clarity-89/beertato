import gql from "graphql-tag";

const invFields = `
  amount
  id
`;

const itemFields = `
  name
  id
`;

export const HOP_INVENTORY = gql`
  {
    results: hopInventory {
      ${invFields}
      item: hop {
        ${itemFields}
      }
    }
  }
`;

export const GET_HOPS = gql`
  {
    results: hops {
      ${itemFields}
    }
  }
`;

export const ADD_HOP_ITEM = gql`
  mutation addHopInventory($amount: String!, $item_id: String!) {
    addItem: addHopInventory(amount: $amount, item_id: $item_id) {
      ${invFields}
      item: hop {
        ${itemFields}
      }
    }
  }
`;

export const UPDATE_HOP_ITEM = gql`
  mutation updateHopInventory($amount: String!, $id: String!) {
    updateItem: updateHopInventory(amount: $amount, id: $id) {
      ${invFields}
      item: hop {
        ${itemFields}
      }
    }
  }
`;

export const DELETE_HOP_ITEM = gql`
  mutation deleteHopInventory($id: String!) {
    deleteItem: deleteHopInventory(id: $id)
  }
`;

export const GRAIN_INVENTORY = gql`
  {
    results: grainInventory {
      ${invFields}
      item: grain {
        ${itemFields}
      }
    }
  }
`;

export const GET_GRAINS = gql`
  {
    results: grains {
      ${itemFields}
    }
  }
`;

export const ADD_GRAIN_ITEM = gql`
  mutation addGrainInventory($amount: String!, $item_id: String!) {
    addItem: addGrainInventory(amount: $amount, item_id: $item_id) {
      ${invFields}
      item: grain {
        ${itemFields}
      }
    }
  }
`;

export const UPDATE_GRAIN_ITEM = gql`
  mutation updateGrainInventory($amount: String!, $id: String!) {
    updateItem: updateGrainInventory(amount: $amount, id: $id) {
      ${invFields}
      item: grain {
        ${itemFields}
      }
    }
  }
`;

export const DELETE_GRAIN_ITEM = gql`
  mutation deleteGrainInventory($id: String!) {
    deleteItem: deleteGrainInventory(id: $id)
  }
`;

export const ADJUNCT_INVENTORY = gql`
  {
    results: adjunctInventory {
      ${invFields}
      item: adjunct {
        ${itemFields}
      }
    }
  }
`;

export const GET_ADJUNCTS = gql`
  {
    results: adjuncts {
      ${itemFields}
    }
  }
`;

export const ADD_ADJUNCT_ITEM = gql`
  mutation addAdjunctInventory($amount: String!, $item_id: String!) {
    addItem: addAdjunctInventory(amount: $amount, item_id: $item_id) {
      ${invFields}
      item: adjunct {
        ${itemFields}
      }
    }
  }
`;

export const UPDATE_ADJUNCT_ITEM = gql`
  mutation updateAdjunctInventory($amount: String!, $id: String!) {
    updateItem: updateAdjunctInventory(amount: $amount, id: $id) {
      ${invFields}
      item: adjunct {
        ${itemFields}
      }
    }
  }
`;

export const DELETE_ADJUNCT_ITEM = gql`
  mutation deleteAdjunctInventory($id: String!) {
    deleteItem: deleteAdjunctInventory(id: $id)
  }
`;
