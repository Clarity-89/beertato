import gql from "graphql-tag";

const INVENTORY_FIELDS = gql`
  fragment InventoryFields on Hop {
    name
    id
  }
`;

export const HOP_INVENTORY = gql`
  {
    results: hopInventory {
      id
      amount
      item: hop {
        ...InventoryFields
      }
    }
  }
  ${INVENTORY_FIELDS}
`;

export const GRAIN_INVENTORY = gql`
  {
    results: grainInventory {
      id
      amount
      item: grain {
        name
        id
      }
    }
  }
  ${INVENTORY_FIELDS}
`;

export const GET_HOPS = gql`
  {
    results: hops {
      ...InventoryFields
    }
  }
  ${INVENTORY_FIELDS}
`;

export const ADD_HOP_ITEM = gql`
  mutation addHopInventory($amount: String!, $hop: String!) {
    addItem: addHopInventory(amount: $amount, hop: $hop) {
      id
      amount
      item: hop {
        ...InventoryFields
      }
    }
  }
  ${INVENTORY_FIELDS}
`;

export const UPDATE_HOP_ITEM = gql`
  mutation updateHopInventory($amount: String!, $id: String!) {
    updateItem: updateHopInventory(amount: $amount, id: $id) {
      id
      amount
      item: hop {
        ...InventoryFields
      }
    }
  }
  ${INVENTORY_FIELDS}
`;

export const DELETE_HOP_ITEM = gql`
  mutation deleteHopInventory($id: String!) {
    deleteItem: deleteHopInventory(id: $id)
  }
`;
