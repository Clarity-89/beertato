import gql from "graphql-tag";

const invFields = `
  amount
  id
`;

const itemFields = `
  name
  id
`;

export const INVENTORY = gql`
  query Inventory($type: ItemType){
    inventory(type:$type) {
      ${invFields}
      item {
        ${itemFields}
      }
    }
  }
`;

export const GET_ITEMS = gql`
  query GetItems($type: ItemType){
    items(type: $type) {
      ${itemFields}
    }
  }
`;

export const ADD_INVENTORY = gql`
  mutation AddInventory($amount: Float!, $item_id: ID!) {
    addInventory(amount: $amount, item_id: $item_id) {
      ${invFields}
      item {
        ${itemFields}
      }
    }
  }
`;

export const UPDATE_INVENTORY = gql`
  mutation UpdateInventory($amount: Float!, $id: ID!) {
    updateInventory(amount: $amount, id: $id) {
      ${invFields}
      item {
        ${itemFields}
      }
    }
  }
`;

export const DELETE_INVENTORY = gql`
  mutation DeleteInventory($id: ID!) {
    deleteInventory(id: $id)
  }
`;
