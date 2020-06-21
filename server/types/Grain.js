module.exports = /* GraphQL */ `
  type Grain {
    id: String!
    name: String!
    origin: Origin
    yield: Float
    color: Float
    protein: Float
    mash: Int
    description: String
    image: String
  }

  type Query {
    grain(id: String!): Grain
    grains: [Grain]
  }

  schema {
    query: Query
  }
`;
