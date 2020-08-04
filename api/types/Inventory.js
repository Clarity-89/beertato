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
    addHopInventory(amount: String!, hop: String!): HopInventory
    updateHopInventory(amount: String!, id: String!): HopInventory
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
