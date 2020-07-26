module.exports = /* GraphQL */ `
  type HopInventory {
    id: String!
    amount: Float!
    user_id: Int!
    hop_id: Int!
  }

  type Query {
    hopInventory: [HopInventory]
  }

  type Mutation {
    addHopInventory(amount: Int!, hop_id: Int!): Int
    updateHopInventory(amount: Int!, hop_id: Int!): HopInventory
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
