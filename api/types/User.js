module.exports = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    username: String
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;
