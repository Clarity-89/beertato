module.exports = /* GraphQL */ `
  type Adjunct {
    id: String!
    name: String!
    description: String
  }

  type Query {
    adjunct(id: String!): Adjunct
    adjuncts: [Adjunct]
  }
`;
