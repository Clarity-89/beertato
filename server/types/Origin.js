module.exports = /* GraphQL */ `
  type Origin {
    id: String!
    name: String!
    code: String
  }

  type Query {
    origin(id: String!): Origin
    origins: [Origin]
  }

  schema {
    query: Query
  }
`;
