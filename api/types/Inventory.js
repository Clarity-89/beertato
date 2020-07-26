module.exports = /* GraphQL */ `
  type HopInventory {
    id: String!
    amount: Float!
    user: Int!
    hop: Hop!
  }

  type Query {
    hopInventory: [HopInventory]
  }

  type Mutation {
    addHopInventory(amount: Int!, hop: Int!): Int
    updateHopInventory(amount: Int!, hop: Int!): HopInventory
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
