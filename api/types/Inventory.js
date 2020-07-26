module.exports = /* GraphQL */ `
  type HopInventory {
    id: String!
    amount: Float!
    user_id: Int!
    hop_id: Int!
  }

  type Query {
    hopInventory(user_id: Int!): HopInventory
  }

  type Mutation {
    addHopInventory(amount: Int!, user_id: Int, hop_id: Int!): HopInventory
    updateHopInventory(amount: Int!, hop_id: Int!): HopInventory
  }
`;
