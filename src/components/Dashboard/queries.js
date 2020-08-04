import gql from "graphql-tag";

export const HOP_INVENTORY = gql`
  {
    results: hopInventory {
      id
      amount
      item: hop {
        name
        id
      }
    }
  }
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
`;

export const GET_HOPS = gql`
  {
    results: hops {
      id
      name
    }
  }
`;

export const ADD_HOP_ITEM = gql`
  mutation addHopInventory($amount: String!, $hop: String!) {
    addHopInventory(amount: $amount, hop: $hop) {
      id
      amount
      item: hop {
        id
        name
      }
    }
  }
`;

export const UPDATE_HOP_ITEM = gql`
  mutation updateHopInventory($amount: String!, $id: String!) {
    updateHopInventory(amount: $amount, id: $id) {
      id
      amount
      item: hop {
        id
        name
      }
    }
  }
`;
