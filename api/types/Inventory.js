module.exports = /* GraphQL */ `
  type HopInventory {
    id: String!
    amount: Float!
    user: Int!
    hop: Hop!
  }

  type GrainInventory {
    id: String!
    amount: Float!
    user: Int!
    grain: Grain!
  }

  type AdjunctInventory {
    id: String!
    amount: Float!
    user: Int!
    adjunct: Adjunct!
  }

  type Query {
    hopInventory: [HopInventory]
    grainInventory: [GrainInventory]
    adjunctInventory: [AdjunctInventory]
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
