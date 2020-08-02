import gql from "graphql-tag";

export const HOP_INVENTORY = gql`
  {
    results: hopInventory {
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
      hop {
        id
        name
      }
    }
  }
`;
